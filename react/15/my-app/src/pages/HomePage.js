import React, { Component } from 'react';
import Layout from './Layout';

class HomePage extends Component {
    render() {
        return (
            // 是否显示组件
            <Layout showTopBar={false} showBottomBar={true} title="商城首页">
                {/* <div>
                    <h3>HomePage</h3>
                </div> */}

                {/* 具名插槽:传递一个对象 */}
                {
                    {
                        // jsx形式
                        content: (
                            <div>
                                <h3>HomePage</h3>
                            </div> 
                        ),
                        // 字符串形式
                        tex: 'hshshsh',
                        // 事件传递
                        btnClick: () => {
                            console.log('btnClick')
                        }
                    }
                }
            </Layout>

        );
    }
}

export default HomePage;