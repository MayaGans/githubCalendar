#' A github inspired calendar visualization
#'
#' @param dates the dates to plot on the calendar, must all be in the same year
#' @param values the values associated with each date
#' @param elementId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#'
#' @name githubCalendar-shiny
#'
#' @export
#'
#' @examples
#' dates <- sample(seq(as.Date('2020-01-01'), as.Date('2020-12-31'), by="day"), 50)
#' values <- abs(round(rnorm(50, 100, 100), 0))
#' githubCalendar(dates = dates, values = values)
#'
githubCalendar <- function(dates, values, width = "100%", height = NULL, elementId = NULL) {

  if (!lubridate::is.Date(dates)) {
    stop("dates argument must be of type Date")
  }

  if (length(unique(lubridate::year(dates))) < 1) {
    stop("githubCalendar cannot be created without data")
  }

  if (length(unique(lubridate::year(dates))) > 1) {
    stop("githubCalendar can only be create for a single year")
  }


  # forward options using x
  x = list(
    data = interpolate_dates(dates, values)
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'githubCalendar',
    x,
    width = width,
    height = height,
    package = 'githubCalendar',
    elementId = elementId,
    sizingPolicy = htmlwidgets::sizingPolicy(
      padding = 15,
      browser.fill = TRUE,
      defaultWidth = "100%"
    )
  )
}



#' Shiny bindings for githubCalendar
#'
#' Output and render functions for using githubCalendar within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a githubCalendar
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name githubCalendar-shiny
#'
#' @export
#'
githubCalendarOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'githubCalendar', width, height, package = 'githubCalendar')
}

#' @rdname githubCalendar-shiny
#' @export
renderGithubCalendar <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, githubCalendarOutput, env, quoted = TRUE)
}

githubCalendar_html <- function(...){
  htmltools::tagList(
    htmltools::tags$div(..., class="calendar")
  )
}

