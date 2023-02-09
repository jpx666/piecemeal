<template>
    <div class="box" ref="boxRef" v-for="(item, index) in backgroundValue" :key="item.background" >{{ index }}</div>
    <div class="loading" v-if="loadingStatus">正在加载...</div>
</template>
<script lang="ts">
import { 
  defineComponent, 
  reactive,
  ref, 
  onMounted,
  nextTick,
  watch,
  Ref,
} from 'vue';

import { backgroundColorRequest,  arrMap} from '../request/index'
import { throttle } from '../utils/throttle'

export default defineComponent({
    name: 'viewPage',
  
    setup(){

        // ref
        const boxRef:Ref = ref(null);
        const backgroundValue:arrMap[] = reactive([]);
        const dataNum = 50

        // loading开关 默认关闭
        const loadingStatus = ref(false);

        async function  getBackgroundColor(num?: number): Promise<void> {
          loadingStatus.value = true;
          backgroundValue.length < dataNum && backgroundValue.push(...await backgroundColorRequest(num));  
          loadingStatus.value = false;
        }

        let  scrollChange = () => {

          // 滚动条位置
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

          // 总高度
          let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

          // 可视区
          let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;

          // 总高度的一半
          let scrollHeightHalf = scrollHeight / 2.
          
          if(scrollTop + windowHeight > scrollHeightHalf) {
              getBackgroundColor()
          }
        }

        onMounted(() => {
            document.addEventListener('scroll', throttle(scrollChange, 500))
            getBackgroundColor();
        });

        watch(backgroundValue, () =>  {
          nextTick(() => {
            boxRef.value.forEach((item: HTMLElement, index: number)=>{
              item.style.background = backgroundValue[index].background
            })
          });
        });

        return {
            boxRef,
            backgroundValue,
            loadingStatus
        }
    },
  

});
</script>

<style>
.box{
  width: 100%;
  height: 500px;
  text-align: center;
}

.loading{
  width: 100%;
  height: 50px;
  background: #000;
  color: #fff;
  text-align: center;
}
</style>