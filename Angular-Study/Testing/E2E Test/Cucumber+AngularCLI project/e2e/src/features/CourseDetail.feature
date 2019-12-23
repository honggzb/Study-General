Feature: To work with Course Detail page

    @smoke
    Scenario: Click Course details of application
        And I get the heading
        And I click the 'Selenium Framework development' course
        Then I should see 'Selenium Framework development' course in courseDetails page