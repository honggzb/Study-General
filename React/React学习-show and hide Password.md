- [method 1](#method-1)
- [method 2 -using Material UI](#method-2--using-material-ui)

## method 1

```ts
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);

<h1 className="geeks">GeeksforGeeks</h1>
<h3>React Example to Show/Hide password</h3>
<div>
  <label for="pass">Enter password: </label>
    <input id="pass" 
           type={ showPassword ? "text" : "password" }
           value={password}
           onChange={(e) => setPassword(e.target.value) }/>
    <br />
    <label for="check">Show Password</label>
    <input id="check" 
           type="checkbox" 
           value={showPassword}
           onChange={() => setShowPassword((prev) => !prev)} />
</div>
```

## method 2 -using Material UI

- `npm i @material-ui/core @material-ui/icons`

```ts
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";

const App = () => {
    const [values, setValues] = useState({
        password: "",
        showPassword: false,
    });
 
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };
 
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
 
    const handlePasswordChange = (prop) => (event) => {
        setValues({
            ...values,
            [prop]: event.target.value,
        });
    };
 
    return (
        <div style={{ marginLeft: "30%" }}>
            <h4> How to show and hide password in React? </h4>
            <InputLabel htmlFor="standard-adornment-password"> Enter your Password </InputLabel>
            <Input type={ values.showPassword ? "text" : "password" }
                   onChange={handlePasswordChange("password")}
                   value={values.password}
                   endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={ handleClickShowPassword }
                                    onMouseDown={ handleMouseDownPassword } >
                            {values.showPassword ? ( <Visibility /> ) : (  <VisibilityOff /> )}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </div>
    );
};
export default App;
```
