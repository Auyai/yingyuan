<template>
  <div>
    <div class="whole">
      <div class="left">
        <div class="panel">
          <div class="panel-header">
            
            
            <div style="color: #ef4238;font-size: 28px;"> 
              <i class="iconfont icon-r-team" style="font-size: 42px;"> </i> 
              <b> 热映中</b>
            </div>
            <a href="/movie/movieOngoing">全部</a>
          </div>
          <div class="panel-content">
            <movie-item :movieItem="item" v-for="(item, index) in ongoingMovieList" :key="index"></movie-item>
          </div>
        </div>
        <div class="panel">
          <div class="panel-header">
            <div style="color: #2d98f3;font-size: 28px;"> 
              <i class="iconfont icon-r-refresh" style="font-size: 42px;"> </i> 
              <b> 即将上映</b>
            </div>
            <a href="/movie/movieUpcoming">全部</a>
          </div>
          <div class="panel-content">
            <div class="panel-content">
              <movie-item :movieItem="item" v-for="(item,index) in upcomingMovieList" :key="index"></movie-item>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-header">
            <div style="color: #ef4238;font-size: 28px;"> 
              <i class="iconfont icon-r-love" style="font-size: 42px;"> </i> 
              <b> 热播影片</b>
            </div>
            <a href="/movie/movieClassics">全部</a>
          </div>
          <div class="panel-content">
            <div class="panel-content">
              <movie-item :movieItem="item" v-for="(item,index) in classicMovieList" :key="index"></movie-item>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="panel">
          <div class="panel-header">
            <div style="color: #ffb400;font-size: 28px;"> 
              <i class="iconfont icon-r-paper" style="font-size: 38px;"> </i> 
              <b> 票房榜</b>
            </div>
            <a href="/rankingList/totalBoxOfficeList">查看完整榜单</a>
          </div>
          <div class="panel-content">
            <div class="board" v-for="(item, index) in totalBoxOfficeList" :key="index">
              <div class="board-left">
                <i class="board-index">{{index+1}}</i>
              </div>
              <div class="board-middle">
                <a :href="'/movieInfo/' + item.movieId">
                  <p class="name">{{ item.movieName }}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import movieItem from '../../components/movie/movie-item'
import moment from 'moment'
export default {
  name: "Home",
  components: {
    movieItem
  },
  data() {
    return {
      queryInfo1: {
        total: 0,
        pageSize: 8,
        pageNum: 1,
        startDate: moment().subtract(365, "days").format("YYYY-MM-DD"),
        endDate: moment().format('YYYY-MM-DD'),
      },
      queryInfo2: {
        total: 0,
        pageSize: 8,
        pageNum: 1,
        startDate: moment().format('YYYY-MM-DD')
      },
      queryInfo3: {
        total: 0,
        pageSize: 8,
        pageNum: 1
      },
      queryInfo4:{
        pageSize: 10,
        pageNum: 1
      },
      ongoingMovieList: [],
      upcomingMovieList: [],
      classicMovieList: [],
      totalBoxOfficeList: []
    }
  },
  created() {
    this.getOngoingMovieList()
    this.getUpcomingMovieList()
    this.getClassicMovieList()
    this.getHeight()
    this.getTotalBoxOfficeList()
  },
  methods:{
    async getOngoingMovieList() {
      const {data : res}  = await axios.get('sysMovie/find', {params: this.queryInfo1})
      if(res == undefined) {
        return;
      }
      this.ongoingMovieList = res.data
      this.total = res.total
    },
    async getUpcomingMovieList() {
      const {data : res} = await axios.get('sysMovie/find', {params: this.queryInfo2})
      if(res == undefined) {
        return;
      }
      this.upcomingMovieList = res.data
      this.total = res.total
    },
    async getClassicMovieList() {
      const {data : res}  = await axios.get('sysMovie/find', {params: this.queryInfo3})
      if(res == undefined) {
        return;
      }
      this.classicMovieList = res.data
      this.total = res.total
    },
    getHeight() {
      let clientWidth =   `${document.documentElement.clientWidth}`
      clientWidth *= 0.8
      this.carouselHeight = clientWidth / 1700 * 520 + 'px'
    },
    async getTotalBoxOfficeList(){
      const {data : resp} = await axios.get('sysMovie/find/rankingList/1', {params: this.queryInfo4})
      if(resp == undefined) {
        return;
      }
      console.log(resp)
      if(resp.code !== 200) return this.$message.error(resp.msg)
      this.totalBoxOfficeList = resp.data
    }
  }
}
</script>

<style scoped>

.el-carousel {
  width: 80%;
  margin: 30px auto;
}

.el-carousel__item > img {
  width: 100%;
  height: auto;
}

.whole{
  width: 1200px;
  margin: 30px auto;
  display: flex;
}

.left{
  width: 70%;
}

.right{
  width: 30%;
  margin-left: 100px;
}

h2{
  font-size: 26px;
}

.panel-header > a{
  text-align: center;
  text-decoration: none;
  color: #999;
  padding-right: 14px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAOCAYAAAASVl2WAAAABmJLR0QA/wD/AP+gvaeTAAAAv0lEQVQY013RTUpDQRAE4G8eghcR8ScgKCIugpJFjuIjqAvBc7jxj0muEnCjiIQQJOImB3GnbnpkfL1qpqqrunpSzvkDPxjhGdq2VarBF3q4wRHknP8RzvCEQzzguCalaHZwiwHecY6XogCf8TjFHh7Rh9Tx3AylIZa4TgWpSBuY4BSrYlFXKsr4bjrTW5HkJJa9SBW4jbtukmKxG5MDLOKqfzEPcB9LzQN8LSdfwxj7eMMlZvV/NFiPzFddEH4Bt5Y1mf3fnDwAAAAASUVORK5CYII=) no-repeat 100%
}


.panel-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  /*margin-right: 20px;*/
  /*margin-left: 20px;*/
}

.movie-item{
  margin-left: 0;
  margin-right: 30px;
}

.movie-item:nth-child(4n){
  margin-right: 0;
}

.board{
  display: flex;
  margin: 10px 10px;
}

.board-left{
  display: flex;
  align-items: center;
}

.board-middle{
  display: flex;
  /*align-items: center;*/
  /*justify-content: center;*/
  margin-left: 10px;
  width: 150px;
  font-size: 18px;
}

.board-middle > a{
  text-decoration: none;
  color: #333;
}

.board-right{
  display: flex;
  font-size: 14px;
  font-weight: 700;
  color: #ffb400;
  margin-left: 40px;
  align-items: center;
}

.board-index{
  color: #ffb400;
  display: inline-block;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
  /*font-weight: 700;*/
  align-items: center;
}

.panel-content{
  margin: 0px 0px 50px 0px;
}

</style>
