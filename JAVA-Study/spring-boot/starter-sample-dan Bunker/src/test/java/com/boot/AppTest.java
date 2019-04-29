package com.boot;

import org.junit.Test;
import static org.junit.Assert.assertEquals;

import com.boot.controller.HomeController;

public class AppTest {

	@Test
    public void testApp() {
		HomeController hc = new HomeController();
		String result = hc.home();
        assertEquals( result, "Das Boot, reporting for duty!" );
	}
}
