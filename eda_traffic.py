import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import numpy as np
import os
import subprocess
import platform
from scipy.stats import zscore
from sklearn.cluster import KMeans
from statsmodels.tsa.seasonal import seasonal_decompose

# ==============================
# 📁 Setup
# ==============================

file_path = r"C:\Users\2024\Desktop\data.xlsx"
sheet_name = "Sheet1"
plot_dir = "Plots"
report_path = "EDA_Report.xlsx"
html_report_path = "EDA_Interactive.html"
md_summary_path = "EDA_Summary.md"

os.makedirs(plot_dir, exist_ok=True)

# ==============================
# 📊 Load Data
# ==============================

df = pd.read_excel(file_path, sheet_name=sheet_name)

# ==============================
# 🧹 Preprocessing
# ==============================

df['Timestamp'] = pd.to_datetime(df['Timestamp'])
df['Hour'] = df['Timestamp'].dt.hour
df['Day'] = df['Timestamp'].dt.day_name()
df['Month'] = df['Timestamp'].dt.month_name()
df['Year'] = df['Timestamp'].dt.year

# ==============================
# 📌 Summary Stats
# ==============================

summary_stats = df.describe()
nulls = df.isnull().sum()
data_shape = df.shape

with pd.ExcelWriter(report_path, engine='openpyxl', mode='w') as writer:
    summary_stats.to_excel(writer, sheet_name='Summary Stats')
    nulls.to_frame(name='Null Count').to_excel(writer, sheet_name='Nulls')

# ==============================
# 🔍 Anomaly Detection
# ==============================

df['Volume Z-Score'] = zscore(df['Vehicle Volume'])
z_thresh = 3
z_anomalies = df[np.abs(df['Volume Z-Score']) > z_thresh]

q1 = df['Vehicle Volume'].quantile(0.25)
q3 = df['Vehicle Volume'].quantile(0.75)
iqr = q3 - q1
iqr_anomalies = df[(df['Vehicle Volume'] < q1 - 1.5 * iqr) | (df['Vehicle Volume'] > q3 + 1.5 * iqr)]

with pd.ExcelWriter(report_path, engine='openpyxl', mode='a') as writer:
    z_anomalies.to_excel(writer, sheet_name='Z-Score Anomalies', index=False)
    iqr_anomalies.to_excel(writer, sheet_name='IQR Anomalies', index=False)

# ==============================
# 🧭 Grouped Insights
# ==============================

hourly_stats = df.groupby('Hour')[['Vehicle Volume', 'Avg Speed (km/h)']].mean()
day_stats = df.groupby('Day')[['Vehicle Volume', 'Avg Speed (km/h)']].mean()
vehicle_stats = df.groupby('Vehicle Type')[['Vehicle Volume', 'Avg Speed (km/h)']].mean()

with pd.ExcelWriter(report_path, engine='openpyxl', mode='a') as writer:
    hourly_stats.to_excel(writer, sheet_name='Hourly Stats')
    day_stats.to_excel(writer, sheet_name='Daily Stats')
    vehicle_stats.to_excel(writer, sheet_name='Vehicle Stats')

# ==============================
# 📉 Time Series Decomposition
# ==============================

daily_volume = df.set_index('Timestamp').resample('D')['Vehicle Volume'].sum()
decomp = seasonal_decompose(daily_volume, model='additive', period=7)

decomp.trend.plot(title="Trend Component", figsize=(10, 4))
plt.tight_layout()
plt.savefig(f"{plot_dir}/ts_trend.png")
plt.close()

decomp.seasonal.plot(title="Seasonal Component", figsize=(10, 4))
plt.tight_layout()
plt.savefig(f"{plot_dir}/ts_seasonal.png")
plt.close()

decomp.resid.plot(title="Residuals", figsize=(10, 4))
plt.tight_layout()
plt.savefig(f"{plot_dir}/ts_residuals.png")
plt.close()

# ==============================
# 📍 Clustering
# ==============================

X = df[['Vehicle Volume', 'Avg Speed (km/h)']].dropna()
kmeans = KMeans(n_clusters=3, random_state=0).fit(X)
df['Cluster'] = kmeans.labels_

plt.figure(figsize=(10, 6))
sns.scatterplot(data=df, x='Vehicle Volume', y='Avg Speed (km/h)', hue='Cluster', palette='Set2')
plt.title("K-Means Clustering: Volume vs Speed")
plt.tight_layout()
plt.savefig(f"{plot_dir}/kmeans_clusters.png")
plt.close()

# ✅ Save dataset with clusters to report
with pd.ExcelWriter(report_path, engine='openpyxl', mode='a') as writer:
    df.to_excel(writer, sheet_name='Data with Clusters', index=False)

# ==============================
# 📆 Calendar Heatmap
# ==============================

calendar_df = df.groupby(df['Timestamp'].dt.date)['Vehicle Volume'].sum().reset_index()
calendar_df.rename(columns={'Timestamp': 'Date'}, inplace=True)
calendar_df['Date'] = pd.to_datetime(calendar_df['Date'])
calendar_df['Week'] = calendar_df['Date'].dt.isocalendar().week
calendar_df['DayOfWeek'] = calendar_df['Date'].dt.dayofweek
pivot = calendar_df.pivot_table(index='Week', columns='DayOfWeek', values='Vehicle Volume')

plt.figure(figsize=(12, 6))
sns.heatmap(pivot, cmap="YlOrBr", cbar_kws={'label': 'Total Volume'})
plt.title("Calendar Heatmap of Vehicle Volume")
plt.tight_layout()
plt.savefig(f"{plot_dir}/calendar_volume.png")
plt.close()

# ==============================
# 📊 Static Visualizations
# ==============================

# Trendline
plt.figure(figsize=(15, 6))
sns.regplot(x=np.arange(len(df)), y=df['Vehicle Volume'], scatter=False, line_kws={'color': 'green'})
plt.plot(df['Vehicle Volume'].values, alpha=0.5, label='Vehicle Volume')
plt.title("Vehicle Volume Trendline")
plt.legend()
plt.tight_layout()
plt.savefig(f"{plot_dir}/volume_trendline.png")
plt.close()

# Anomalies
plt.figure(figsize=(15, 6))
plt.plot(df['Timestamp'], df['Vehicle Volume'], label='Vehicle Volume', alpha=0.6)
plt.scatter(z_anomalies['Timestamp'], z_anomalies['Vehicle Volume'], color='red', s=10, label='Anomalies')
plt.title("Vehicle Volume Anomalies")
plt.legend()
plt.tight_layout()
plt.savefig(f"{plot_dir}/volume_anomalies.png")
plt.close()

# Heatmap
speed_heatmap = df.groupby(['Day', 'Hour'])['Avg Speed (km/h)'].mean().unstack()
ordered_days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
speed_heatmap = speed_heatmap.reindex(ordered_days)

plt.figure(figsize=(12, 6))
sns.heatmap(speed_heatmap, cmap='YlGnBu', annot=True, fmt=".1f")
plt.title("Average Speed by Hour and Day")
plt.tight_layout()
plt.savefig(f"{plot_dir}/speed_heatmap.png")
plt.close()

# Correlation
corr = df[['Vehicle Volume', 'Avg Speed (km/h)', 'Traffic Multiplier', 'Hour']].corr()
plt.figure(figsize=(8, 5))
sns.heatmap(corr, annot=True, cmap='coolwarm')
plt.title("Correlation Matrix")
plt.tight_layout()
plt.savefig(f"{plot_dir}/correlation_matrix.png")
plt.close()

# ==============================
# 📈 Interactive Plotly Visuals
# ==============================

fig1 = px.scatter(df, x='Vehicle Volume', y='Avg Speed (km/h)', color='Traffic Intensity',
                  title="Interactive: Speed vs Volume")
fig2 = px.box(df, x='Hour', y='Vehicle Volume', color='Route',
              title="Interactive: Volume per Route/Hour")
fig3 = px.density_heatmap(df, x='Hour', y='Day', z='Avg Speed (km/h)', histfunc='avg',
                          color_continuous_scale='YlGnBu', title="Interactive Heatmap: Speed by Day/Hour")

with open(html_report_path, "w", encoding='utf-8') as f:
    f.write(fig1.to_html(full_html=False, include_plotlyjs='cdn'))
    f.write(fig2.to_html(full_html=False, include_plotlyjs='cdn'))
    f.write(fig3.to_html(full_html=False, include_plotlyjs='cdn'))

# ==============================
# 📝 Markdown Summary
# ==============================

with open(md_summary_path, "w", encoding='utf-8') as md:
    md.write(f"# 🧾 EDA Summary\n\n")
    md.write(f"**Dataset shape:** {data_shape}\n\n")
    md.write(f"## Null Values:\n\n{nulls.to_string()}\n\n")
    md.write(f"## Statistical Summary (first few rows):\n\n{summary_stats.head().to_markdown()}\n\n")
    md.write(f"## Volume Anomalies Detected (Z-score > {z_thresh}): {len(z_anomalies)} records\n")
    md.write(f"## Clustering Applied: K-Means with 3 clusters\n")

# ==============================
# ✅ Completion + Open Files
# ==============================

print("\n✅ Enhanced EDA Completed.")
print(f"📊 Static plots saved to: {plot_dir}")
print(f"📄 Excel report: {report_path}")
print(f"📘 Markdown summary: {md_summary_path}")
print(f"🌐 Interactive report: {html_report_path}")

def open_path(path):
    try:
        if platform.system() == "Windows":
            os.startfile(path)
        elif platform.system() == "Darwin":
            subprocess.run(["open", path])
        else:
            subprocess.run(["xdg-open", path])
    except Exception as e:
        print(f"⚠️ Could not open {path}: {e}")

open_path(report_path)
open_path(html_report_path)
open_path(md_summary_path)
open_path(plot_dir)

