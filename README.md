# githubCalendar
Creating a custom visual in Observable, then turning it into an htmlwidget to be used in R! All the user needs to do is supply their own data!


## Install the library
```
devtools::install_github("MayaGans/githubCalendar")
```

## Run the `githubCalendar` function on your data

```
# dates must be in date form

my_data <- tidyr::tibble(
  dates = as.Date(c("2020-01-02", "2020-03-01", "2020-04-04",
                    "2020-05-05", "2020-06-06", "2020-07-07",
                    "2020-08-08", "2020-09-09", "2020-10-10",
                    "2020-11-11", "2020-12-12")),
  values = round(rnorm(11, 100, 100), 0)                 
)

githubCalendar(dates = my_data$dates, values = my_data$values)

```


![](readme.png)
