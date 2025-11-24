import io.restassured.RestAssured;
import org.testng.annotations.Test;
import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

public class DummyJsonTests {

    @Test
    public void loginTest() {
        given().contentType("application/json")
            .body("{ \"username\": \"kminchelle\", \"password\": \"0lelplR\" }")
        .when()
            .post("https://dummyjson.com/auth/login")
        .then()
            .statusCode(200)
            .body("token", notNullValue());
    }

    @Test
    public void getAllProducts() {
        when()
            .get("https://dummyjson.com/products")
        .then()
            .statusCode(200)
            .body("products.size()", greaterThan(0));
    }

    @Test
    public void addToCart() {
        given().contentType("application/json")
            .body("{ \"userId\": 1, \"products\": [ { \"id\": 1, \"quantity\": 2 }, { \"id\": 2, \"quantity\": 3 } ] }")
        .when()
            .post("https://dummyjson.com/carts/add")
        .then()
            .statusCode(200)
            .body("products.size()", equalTo(2));
    }

    @Test
    public void negativeMissingUser() {
        given().contentType("application/json")
            .body("{ \"products\": [{ \"id\": 1, \"quantity\": 1 }] }")
        .when()
            .post("https://dummyjson.com/carts/add")
        .then()
            .statusCode(not(200));
    }

    @Test
    public void searchProducts() {
        when()
            .get("https://dummyjson.com/products/search?q=laptop")
        .then()
            .statusCode(200)
            .body("products.size()", greaterThan(0));
    }
}