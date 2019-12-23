Feature: To work with app home page
    As a user
    I want to visit the homepage
    So that I can see all course information

    @smoke
    Scenario: App Page
        Given I navigate to application
        And I get the heading
        Then I should see all course information in Home page
            | Courses  | Duration |
            | Selenium | 2        |
            | Java     | 3        |
        And I click the 'Selenium Framework development' course
        Then I should see 'Selenium Framework development' course in courseDetails page

    @regression
    Scenario: Search for course from External DataSource
        Given I navigate to application
        And I enter text in search from external data source
        And I get the heading
