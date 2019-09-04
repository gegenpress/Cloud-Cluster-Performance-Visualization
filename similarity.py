import math
import pandas as pd

data1 = pd.read_csv("Node 1.csv", usecols = [i for i in data1 if i!= 'timestamp']) 
data2 = pd.read_csv("Node 2.csv",usecols = [i for i in data2 if i!= 'timestamp'])
data3 = pd.read_csv("Node 3.csv", usecols = [i for i in data1 if i!= 'timestamp']) 
data4 = pd.read_csv("Node 4.csv",usecols = [i for i in data2 if i!= 'timestamp'])
data5 = pd.read_csv("Node 5.csv", usecols = [i for i in data1 if i!= 'timestamp']) 
data6 = pd.read_csv("Node 6.csv",usecols = [i for i in data2 if i!= 'timestamp'])
 
dfsum1 = pd.DataFrame(data1.sum(axis = 1))
dfsum2 = pd.DataFrame(data2.sum(axis = 1))
dfsum3 = pd.DataFrame(data1.sum(axis = 1))
dfsum4 = pd.DataFrame(data2.sum(axis = 1))
dfsum5 = pd.DataFrame(data1.sum(axis = 1))
dfsum6 = pd.DataFrame(data2.sum(axis = 1))

sumotherdf1 = dfsum2+dfsum3+dfsum4+dfsum5+dfsum6
# sumotherdf2 = dfsum1+dfsum3+dfsum4+dfsum5+dfsum6
# sumotherdf3 = dfsum1+dfsum2+dfsum4+dfsum5+dfsum6
# sumotherdf4 = dfsum1+dfsum2+dfsum3+dfsum5+dfsum6
# sumotherdf5 = dfsum1+dfsum2+dfsum3+dfsum4+dfsum6
# sumotherdf6 = dfsum1+dfsum2+dfsum3+dfsum4+dfsum5

from scipy.spatial import distance
result = list()
for i in range(0,121):
    similarity = distance.euclidean(dfsum1.iloc[i],sumotherdf.iloc[i])
    result.append(similarity)

res = pd.DataFrame(result)
# res.to_csv('out1.csv')
# res.to_csv('out2.csv')
# res.to_csv('out3.csv')
# res.to_csv('out4.csv')
# res.to_csv('out5.csv')
# res.to_csv('out6.csv')
