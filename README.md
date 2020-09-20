# githubCalendar
Creating a custom visual in Observable, then turning it into an htmlwidget to be used in R! All the user needs to do is supply their own data!


## Install the library
```
devtools::install_github("MayaGans/githubCalendar")
```

## Run the `githubCalendar` function on your data

```
# dates must be Date type
dates <- sample(seq(as.Date('2020-01-01'), as.Date('2020-12-31'), by="day"), 50)
values <- abs(round(rnorm(50, 100, 100), 0))
githubCalendar(dates = dates, values = values)

```


![](readme.png)
