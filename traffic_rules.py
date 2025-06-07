def apply_rules(df):
    df['Is High Volume'] = df['Vehicle Volume'] > 1200
    df['Is Low Speed'] = df['Avg Speed (km/h)'] < 15
    df['Potential Congestion'] = df['Is High Volume'] & df['Is Low Speed']

    df['Is Incident'] = (
        (df['Vehicle Volume'].diff().abs() > 500) &
        (df['Avg Speed (km/h)'].diff().abs() > 10)
    )

    summary = {
        "High Volume Records": df['Is High Volume'].sum(),
        "Low Speed Records": df['Is Low Speed'].sum(),
        "Detected Congestion": df['Potential Congestion'].sum(),
        "Potential Incidents": df['Is Incident'].sum(),
    }

    return df, summary
