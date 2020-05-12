import axios from 'axios';
import Feature from '@/models/feature';
// 具名导出
// export function getFeature():Promise<AxiosResponse<Feature[]>> { //不用写后面的，因为编译器会类型推断
export function getFeature(){
    // return axios.get('/api/list') //get是泛型方法，所以要加约束
    return axios.get<Feature[]>('/api/list')
}
/**
 * get 
 * 查看源码
 * 进入声明文件.d.ts，
 * 告诉你有什么方法
 */