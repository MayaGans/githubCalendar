#' Interpolate Missing Dates
#'
#' Create a table of dates and associated values
#' then add missing dates to table with a value of 0
#'
#' @param dates a vector of dates, must be only one year
#' @param values a vector of values for dates
#'
#' @return a dataframe with dates and values
#'
interpolate_dates <- function(dates, values) {
  missingDates <- unique(lubridate::year(dates)) %>%
    purrr::map(function(d) {
      seq(lubridate::make_date(d, 1, 1), lubridate::make_date(d, 12, 31), by='day')
    }) %>% unlist() %>% setdiff(dates) %>% lubridate::as_date()
  dplyr::bind_rows(tidyr::tibble(dates, values),
                   tidyr::tibble(dates=missingDates, values=0))
}

