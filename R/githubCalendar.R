#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
githubCalendar <- function(dates, values, width = NULL, height = NULL, elementId = NULL) {


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
    elementId = elementId
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
#' @example
#' dates = as.Date(c(
#' "2020-01-01",
#' "2020-01-02",
#' "2020-03-01",
#' "2020-04-04",
#' "2020-05-05"))
#' values = c(1,2,3,4,5,6,7,8,9,10,11,12)
#' githubCalendar(dates = dates, values = values)
#'
githubCalendarOutput <- function(outputId, width = '90%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'githubCalendar', width, height, package = 'githubCalendar')
}

#' @rdname githubCalendar-shiny
#' @export
renderGithubCalendar <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, githubCalendarOutput, env, quoted = TRUE)
}
