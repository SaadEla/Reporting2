import axios from "axios";


let token_key="Bearer";
let token_value="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNjY2JjZjQ1YmVkMjEwN2M5OWI0Njc1OTNiY2EyMzcyNjgyZmNlMDliY2EzM2NjZGY3MDEyY2EzNGEyNjk0MDUzZjJiYzBlYTQwOTYwMzBlIn0.eyJhdWQiOiIyIiwianRpIjoiM2NjYmNmNDViZWQyMTA3Yzk5YjQ2NzU5M2JjYTIzNzI2ODJmY2UwOWJjYTMzY2NkZjcwMTJjYTM0YTI2OTQwNTNmMmJjMGVhNDA5NjAzMGUiLCJpYXQiOjE1NjQ1NzY2NzAsIm5iZiI6MTU2NDU3NjY3MCwiZXhwIjoxNTY1MTgxNDcwLCJzdWIiOiI0OTYiLCJzY29wZXMiOltdfQ.VRijCuCB5119Yf1DfEBM0Q41HA5S46mdrQF3PRpr1BHSKOMKdYqo__sgk1u4xctqcuCDN4rjbr3iGql5ZXOt6hCi9qGgkCSZyrEaE6m54i1JByoM09bmH2-izCLPp_m7ktiI7EYQyJoIvWquBlStYgD3wUDyqextz6b7f5Ncab5Z9JaNjSF0vla3Z4KuwW2YgXgscx-t0i9wGyBVlZOoCF9aliQo5lHV_lACc8drJNYtsdQgeyS05TGAN-mMac1m6hrvkRT8R5p1F8992naUlvkXUme0-vsaaRkMuM7z58cbqLfS1446GqXcVHppY1kQE6nMt29iKSnIQ4KR9ICRSOWDm8IZKmErOQhGtb265WZBtc35-GwwSfkf4JSy10iVy0IEIYwLd1Y5RUFvJd5MvYL1VCpEr7snVSicfJW0R4ottZbWlwBf2s1HHOTuUF_L_01dGAUTa60qTLjqfvKzbIYA89u3GLuF5P5zHgVGSxq6VjWCMMTjUQV8hPm7A2rx1SzkgEHv5xSA9V__T14AlWojse9qVh0yBwdDaaswbZpC7AykjYKdB6pI7E6BghqHf2A4mfVTayUA9OCAtQeJWTZIlJqVDRZOiCEt79MGCpgw22U5ACzqJX6MEiLPnr2R7DgIGIzEYueCKfw96_MW9NgmI_moXhAUIgT9mQ0lcBo";

   const reporting_api = axios.create({
    baseURL: 'https://kpi.jp.co.ma:8443/',
    headers: {
        Accept: "application/json",
        Authorization:`${token_key} ${token_value}`
          
      }
  });

  export default reporting_api;