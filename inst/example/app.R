library(shiny)

githubData <- tidyr::tibble(
    all_dates = as.Date(c("2018-01-01", "2018-01-02", "2018-03-01",
                   "2018-04-04", "2018-05-05", "2018-06-06",
                   "2018-07-07", "2018-08-08", "2018-09-09",
                   "2018-10-10", "2018-11-11", "2018-12-12",
                   "2019-01-01", "2019-01-02", "2019-03-01",
                   "2019-04-04", "2019-05-05", "2019-06-06",
                   "2019-07-07", "2019-08-08", "2019-09-09",
                   "2019-10-10", "2019-11-11", "2019-12-12",
                   "2020-01-01", "2020-01-02", "2020-03-01",
                   "2020-04-04", "2020-05-05", "2020-06-06",
                   "2020-07-07", "2020-08-08", "2020-09-09",
                   "2020-10-10", "2020-11-11", "2020-12-12")),
    all_values = round(rnorm(36, 100, 100), 0)
)

ui <- fluidPage(
    fluidPage(
        sliderInput("year", "Select Year", min = 2018, max = 2020, value = 2019),
        githubCalendarOutput("calendar")
    )
)


server <- function(input, output) {
    data <- reactive({
        githubData %>% dplyr::filter(lubridate::year(all_dates) %in% input$year)
    })

    output$calendar <- renderGithubCalendar(dates = data$dates(), values = data$values())
}

# Run the application
shinyApp(ui = ui, server = server)
