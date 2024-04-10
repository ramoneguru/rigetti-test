# Rigetti take home test

## Notes
* Setup was relatively easy for client/server.
* Flask was chosen for the API since it was pretty straightforward (small issue with CORS)
* Vite (for React) is very simple to get up and working, so I went with that environment
* ChartJS is the charting lib being used since it's `canvas` based which should give better performance for large datasets
* Getting the data structured in a way for presenting was a little more challenging than anticipated
* Of course debugging the final output took more time than anticipated

## Prerequisites (local install)
1. NodeJS > 18.0.0
2. Python 3

### Server install
Run the following commands:

```
$ cd rigetti-test/server
$ python3 -m venv venv
$ source venv/bin/activate
$ pip install flask flask-cors
$ flask run
```

You should now be able to go to: http://127.0.0.1:5000/api/cycle and see the API output


### Client install
Run the following commands:

```
$ cd rigetti-test/client
$ npm install
$ npm run dev
```


You should now be able to go to: http://localhost:5173/ and see the chart data

## Estimates
| Task | Estimate  |
|----------|----------|
| Setup Python Flask   | 30 mins   |
| Get working Flask API   | 30 mins   |
| Setup Vite client for React   | 10 mins   |
| Work on table data render   | 30 mins   |
| Work on chart data render   | 1.5 hours   |
| General debugging   | 1 hour   |
