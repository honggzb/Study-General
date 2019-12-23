import { Given, Then, When, TableDefinition } from 'cucumber';
import { expect, assert } from 'chai';

import { CourseDetailsPage } from "../pages/CourseDetailspage";
import { AppPage } from "../pages/apppage";

const page = new AppPage();
const courseDetails = new CourseDetailsPage();

let headingText = page.GetAllHeadings();
let course = headingText;

Given(/^I navigate to application$/,  async () => {
    await page.navigateTo();
});

When(/^I get the heading$/, async () => {
    await page.GetAllHeadings();
});

Then(/^I should see all course information in Home page$/, async (table: TableDefinition) => {
    const localTable = [
      ['Selenium',	'2'],
      ['Java',	'3']
    ];
    table.rows().forEach(element => {
      console.log(element);
    });
    assert.deepEqual(localTable, table.rows(), "The datasource does not matches with the step definition table.")
});

When(/^I click the '([^\"]*)' course$/, async (headingText) => {
    await page.ClickFirstHeading(headingText.toString());
  });

Then(/^I should see '([^\"]*)' course in coursedetails page$/, async (course) => {
    await expect(courseDetails.GetCourseHeading(course.toString())).to.be.not.null;
});

When(/^I enter text in search from external data source$/, async () => {
    await page.EnterDataInSearchFromExcel();
});
