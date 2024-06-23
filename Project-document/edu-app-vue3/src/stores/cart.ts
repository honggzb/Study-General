import { defineStore } from 'pinia'

export const useCartStore  = defineStore('cart', {
  state: () => {
    return {
      cartList:[],   //购物车数据
      select:[],     //选中的商品的id
      order:[]
    }
  },
  getters: {
    isChecked(){
      return this.select.length == this.cartList.length
    },
    checkAll( ): boolean{
      return this.cartList.length == this.select.length
    },
    total(){                   //总价和数量
      this.order = [];
      let total = {
        price:0,
        number:0
      }
      this.cartList.forEach(v=>{
        if( this.select.indexOf( v.id ) != -1 ){
          this.order.push({ id:v.courseId, number:1 })
          total.price += v.discountPrice * v.counter
          total.number = this.select.length
        }
      })
      return total;
    }
  },
  actions: {
    getCartList( list ){
      list.forEach(v=>{
        v['check'] = true;
        this.select.push( v.id );
      })
      this.cartList = list;
    },
    addCart( list ){           //存储购物车数据
      this.select = [];
      list.forEach( v => {
        v['check'] = true
        this.select.push( v.id )
      })
      this.cartList=list;
    },
    all() {  //全选
      this.select = this.cartList.map( v => {
        v['check'] = true;
        return v.id;
      })
    },
    unAll(){   //全不选
      this.cartList.forEach( v => {
        v['check'] = false;
      })
      this.select = [];
    },
    itemChecked(index) {  //单选
      let id = this.cartList[index].id;      //当前点击的课程都id值
      let idx = this.select.indexOf(id);    //去检查select中有没有
      if( idx > -1 ){   //有
          this.cartList[index].check = false;
          this.select.splice(idx,1);
      }else{      //没有
          this.cartList[index].check = true;
          this.select.push( id );
      }
    }
  },
  persist: {
    enabled: true,
    strategies: [ { storage: localStorage, key: 'cart' } ]
  }
})
