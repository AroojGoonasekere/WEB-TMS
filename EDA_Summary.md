# 🧾 EDA Summary

**Dataset shape:** (338400, 18)

## Null Values:

Timestamp             0
Bottleneck            0
Entry Point           0
Route                 0
Vehicle Type          0
Traffic Multiplier    0
Vehicle Volume        0
Traffic Intensity     0
Avg Speed (km/h)      0
Speed Status          0
Is School Day         0
Is Holiday            0
Is Sunday             0
Is Working Day        0
Hour                  0
Day                   0
Month                 0
Year                  0

## Statistical Summary (first few rows):

|       | Timestamp                     |   Traffic Multiplier |   Vehicle Volume |   Avg Speed (km/h) |      Hour |   Year |
|:------|:------------------------------|---------------------:|-----------------:|-------------------:|----------:|-------:|
| count | 338400                        |        338400        |      338400      |        338400      | 338400    | 338400 |
| mean  | 2023-07-02 07:31:01.276595456 |             0.803537 |          67.9369 |            26.5117 |     11.5  |   2023 |
| min   | 2022-01-01 00:00:00           |             0.6      |          30      |            10      |      0    |   2022 |
| 25%   | 2022-10-01 11:45:00           |             0.6      |          45      |            18.8    |      5.75 |   2022 |
| 50%   | 2023-07-02 11:30:00           |             0.6      |          60      |            26.3    |     11.5  |   2023 |

## Volume Anomalies Detected (Z-score > 3): 5814 records
## Clustering Applied: K-Means with 3 clusters
