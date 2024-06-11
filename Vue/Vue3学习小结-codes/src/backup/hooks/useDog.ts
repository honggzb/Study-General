import { reactive, onMounted } from 'vue'
import axios from 'axios'

export default function() {
  let dogList = reactive([
    'https://images.dog.ceo//breeds//pembroke//n02113023_13200.jpg'
  ])
  async function getDog() {
    try {
      let result = await axios.get('https://dog.ceo/api/breed/pembroke/images/random')
      // console.log(result.data.message)
      dogList.push(result.data.message)
    } catch (error) {
      alert(error)
    }
  }
  onMounted(() => {
    getDog()
  })
  //向外提供东西
  return {dogList, getDog}
}
  