library(shiny)
library(ggplot2)
library(shinyWidgets)
ui <- fluidPage(

    actionGroupButtons(
        inputIds = c("Bar", "Histogram", "Line"),
        labels = list("Bar", "Histogram","Line"),
        status = "danger",
        fullwidth = T
    ),

    plotOutput('plot',height = '563px')

)

server <- function(input, output) {

    v <- reactiveValues(data = iris,
                        plot = NULL)

    test <- reactiveVal(val = 1)

    observeEvent(input$Bar, {
        print(input$Bar)
        v$plot <- ggplot(v$data, aes(Species,Petal.Length)) +
            geom_bar(stat="identity")
        v$text <- "Bar"
    })

    observeEvent(input$Histogram, {
        data <- iris
        v$plot <- ggplot(v$data, aes(Petal.Length)) +
            geom_histogram()
        v$text <- "Histogram"
    })

    observeEvent(input$Line, {
        data <- iris
        v$plot <- ggplot(v$data, aes(Petal.Length,Sepal.Length)) +
            geom_line()
        v$text <- "Line"
    })
}

shinyApp(ui = ui, server = server)

