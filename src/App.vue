<template>
  <v-app>
      <Navbar />
   <v-content>
<router-view></router-view>    

    
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Navbar from './components/Navbar'
import axios from 'axios'

export default {
  components: { Navbar,HelloWorld },
  name: 'App',
  data () {
    return {
            posts: []

    }
  },
  
    created() {
    axios.get('https://relay.jp.co.ma/api/users/496/vehicles?with=relationships', {headers: {
      Accept : 'application/json' ,
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjlhM2QzMDEyZDUwOTk1YmNjNTI4YzZhNzBhYjE3ZWUxNDlkNzkyYjcwYWJkNjIyMzY5MTE5Y2FjODUxZmIxNDExMWM5NzljY2ZiMDQxZmVlIn0.eyJhdWQiOiIyIiwianRpIjoiOWEzZDMwMTJkNTA5OTViY2M1MjhjNmE3MGFiMTdlZTE0OWQ3OTJiNzBhYmQ2MjIzNjkxMTljYWM4NTFmYjE0MTExYzk3OWNjZmIwNDFmZWUiLCJpYXQiOjE1NjMyOTQwNTEsIm5iZiI6MTU2MzI5NDA1MSwiZXhwIjoxNTYzODk4ODUxLCJzdWIiOiI0OTYiLCJzY29wZXMiOltdfQ.XeAgg0IYntRTqydeRgcELs4p9itGEeZSc-H__QFXOFfq6nardaHSa32wD7XI3EFtIdJumjp5pTR8b2heQOzzQMbv6CYeGjzXEDqLO4zqzG12mhlyEDFjRFTFv3X2oo1vFYpve-7OlpgQsvuFVFIGRa0zHCorQ0dGsO7qgioMixP-xlLl5gxu3uw0N5Do_NhsO-Si0wIb9b_QHIYsU6VUNd0D9a0T2mY_Yue8JXmO-nbWvXxCYMukVZnUmJRtWqokac1mmArEJt3X1qqdb_dyRSghZOzD305sYvH1jbTVuT1Z54Z_5EFW_ps13ks5UXmBpWjGrlsT_qoQK9VQir-blIeoFVbBPvTlfHfVFZuBpoP4sJI1j2rLF94a9MU6q4tIMg20PlnEJHYXYcNx4e0gEjMMhEJJi6YHp1XbDYkmNYur73eO1G8sYRLPjZKI9N22RLT3QS4iXt24ngXpzcqrUtNDdclSUjjmmQaD812KIr3CNhOlYxMexozSE-tYOt7wZPQ1XMriquS-dwTpIoDJloRsAbv2GETcW-eieQy7y9319aBCkGWIJWEtHHzrXBSPWYOeO72vIObRAnwumcaxblZ8lDaF2tj9ONYgR-220LnOPxAVGYMqjUY-bgazgC3-1b8QGCjcxwpVRtcKAXDLB8rU2b5th6EAxHinPzS-yHw'
      }} ).then((response) => {
      
      this.posts = response.data
    })
    .catch((e) => {
      console.error(e)
    })
  }}

</script>
