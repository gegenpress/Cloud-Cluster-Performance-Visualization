import numpy as np
import pandas as pd
from flask import Flask, render_template, Response, request, redirect, url_for
import json
app = Flask(__name__)

@app.route("/getPerformance",methods=["GET","POST"])

def getPerformance():
	data = pd.read_csv('Node.csv')
	from sklearn.model_selection import train_test_split
	X = data.iloc[:,1:]
	y = data.iloc[:,:1]

	from sklearn.model_selection import train_test_split
	X_train, y_train, X_test, y_test = None,None,None,None
	X_train,y_train = X[:6134], y[:6134]

	testfile = str(request.args["value"])
	#test_data = pd.read_csv('Node_test3.csv')
	if(testfile == "Node_test1"):
		test_data = pd.read_csv('Node_test1.csv')
	elif(testfile == "Node_test2"):
		test_data = pd.read_csv('Node_test2.csv')
	elif(testfile == "Node_test3"): 
		test_data = pd.read_csv('Node_test3.csv')
	X_t = test_data.iloc[:,1:]
	y_t = test_data.iloc[:,:1]

	X_test,y_test = X_t[:],y_t[:]

	from sklearn.ensemble import RandomForestClassifier
	clf = RandomForestClassifier(n_estimators=50, max_depth=3, random_state=0)
	clf.fit(X_train,y_train)
	train_pred = clf.predict(X_train)
	test_pred = clf.predict(X_test)
	test_pred = pd.DataFrame(test_pred)
	items_counts = test_pred[0].value_counts()
	print(items_counts)
	items_counts = pd.DataFrame(items_counts)
	nodenum = items_counts.iloc[:1,:1].index.values
	#print("The test node behaves most likely as that of node:%d"%(nodenum[0]))
	outdata = pd.read_csv("Node "+str(nodenum[0])+".csv")
	return ("Performance Analysis: The test node behaves most likely as that of node: "+str(nodenum[0])+"::"+outdata.to_html())

if __name__ == "__main__":
	app.run(host="0.0.0.0", port=5001)
    
