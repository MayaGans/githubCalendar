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
interpolate_dates <- function(date, value) {
  missingDates <- unique(lubridate::year(date)) %>%
    purrr::map(function(d) {
      seq(lubridate::make_date(d, 1, 1), lubridate::make_date(d, 12, 31), by='day')
    }) %>% unlist() %>% setdiff(date) %>% lubridate::as_date()
  dplyr::bind_rows(tidyr::tibble(date, value),
                   tidyr::tibble(date=missingDates, value=0)) %>%
  dplyr::mutate(date = as.character(date))
}

