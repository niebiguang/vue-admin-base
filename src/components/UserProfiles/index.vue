<!--
 * @Descripttion: 
 * @version: 
 * @Author: niebiguang
 * @Date: 2021-03-08 15:30:44
 * @LastEditors: niebiguang
 * @LastEditTime: 2021-03-09 15:34:05
-->
<template>
  <div class="">
    <el-tabs v-model="activeName" type="card" tab-position="top" @tab-click="">
      <el-tab-pane label="基本信息" name="first">
        <div class="base-info">
          <div class="base-left">
            <table width="100%" class="table">
              <thead>
                <tr>
                  <th>首次第三方绑定</th>
                  <th>注册</th>
                  <th>实名认证</th>
                  <th>企业微信添加</th>
                </tr>
              </thead>
              <tr>
                <td>微信登陆</td>
                <td>完成注册</td>
                <td>完成实名</td>
                <td>已关联</td>
              </tr>
            </table>
            <div class="weChat">
              <p>微信信息</p>
              <div class="wechat-info">
                <img src="https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIp…aRDicngXJveciboXPJ399BqSyTnJy3W5m4Gp0YW9xsYXA/132" mode="" />
                <div>
                  <span>微信昵称</span>
                  <span>微信绑定手机号：13888888888</span>
                </div>
              </div>
            </div>
            <div class="add-wechat">
              <div class="add-wechat-header">
                <div class="header-left">
                  <p class="left-title">添加客服企业微信</p>
                  <p>企业微信数据更新时间：yyyy-mm-dd hh:mm:ss</p>
                </div>
                <!-- <div class="header-right">更新企业微信数据</div> -->
                <el-button class="header-right" size="default" @click="">更新企业微信数据</el-button>
                
              </div>
              <el-table :data="list" border stripe>
                <el-table-column label="成员userid" prop="groupBuyName" align="center" min-width="80" />
                <el-table-column label="微信备注" prop="groupBuyName" align="center" min-width="80" />
                <el-table-column label="关联客服" prop="groupBuyName" align="center" min-width="80" />
                <el-table-column label="添加时间" prop="groupBuyName" align="center" min-width="80" />
                <el-table-column label="企业标签" prop="groupBuyName" align="center" min-width="80" />
              </el-table>
              
            </div>
          </div>
          <div class="base-right">
            <div class="right-header">
              <div class="sign-info">
                <p>注册信息</p>
                <div>注册手机号：13888888888</div>
                <div>uuid：xxxxxxxxxxxxxxxxxx</div>
              </div>
              <div class="autonym-info">
                <p>实名信息</p>
                <div>姓名：XXX</div>
                <div>身份证：300000000000000000</div>
                <div>实名手机号：13888888888</div>
              </div>
            </div>
            <div class="order-info">
              <p class="title">关联订单身份信息</p>
              <div>记录该用户在协商申请/债务查询中使用过的三要素信息</div>
              <el-table :data="list" border stripe style="margin-top:20px">
                <el-table-column label="姓名" prop="groupBuyName" align="center" min-width="80" />
                <el-table-column label="身份证" prop="groupBuyName" align="center" min-width="80" />
                <el-table-column label="手机号" prop="groupBuyName" align="center" min-width="80" />
              </el-table>
              
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="还款计划" name="second">
        <el-table :data="list" border stripe>
          <el-table-column label="首期还款日" prop="groupBuyName" align="center" min-width="80" />
          <el-table-column label="已还/总期数" prop="groupBuyName" align="center" min-width="80" />
          <el-table-column label="已还/总金额" prop="groupBuyName" align="center" min-width="80" />
          <el-table-column label="末期还款日" prop="groupBuyName" align="center" min-width="80" />
          <el-table-column label="状态" prop="groupBuyName" align="center" min-width="80" />
          <el-table-column label="签约状态" prop="groupBuyName" align="center" min-width="80" />
          <el-table-column label="还款计划ID" prop="groupBuyName" align="center" min-width="80" />
          <el-table-column label="协商ID" prop="groupBuyName" align="center" min-width="80" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="勾销订单" name="third">
        <el-select v-model="typeValue" value-key="" placeholder="全部类型" clearable filterable @change="">
          <el-option label="全部"></el-option>
          
          <el-option v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-table :data="list" border stripe style="margin-top:20px">
          <el-table-column label="类型" prop="groupBuyName" align="center" min-width="80" />
          <el-table-column label="时间" prop="groupBuyName" align="center" min-width="80" />
          <el-table-column label="姓名" prop="groupBuyName" align="center" min-width="80" />
          <el-table-column label="身份证" prop="groupBuyName" align="center" min-width="80" />
          <el-table-column label="手机号" prop="groupBuyName" align="center" min-width="80" />
          <el-table-column label="状态" prop="groupBuyName" align="center" min-width="80" />
          <el-table-column label="签约订单号" prop="groupBuyName" align="center" min-width="80" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="接口查询债务" name="fourth">
        <el-select v-model="typeValue" value-key="" placeholder="全部类型" clearable filterable @change="">
          <el-option label="全部"></el-option>
          
          <el-option v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-table :data="list" border stripe style="margin-top:20px">
          <el-table-column label="产品名称" prop="groupBuyName" align="center" min-width="80" />
          <el-table-column label="债券转让金额" prop="groupBuyName" align="center" min-width="80" />
          <el-table-column label="已回收金额" prop="groupBuyName" align="center" min-width="80" />
          <el-table-column label="待还总额" prop="groupBuyName" align="center" min-width="80" />
          <el-table-column label="个案序列号（案件ID）" prop="groupBuyName" align="center" min-width="80" />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="个人债务管理" name="fifth">
        <el-table :data="list" border stripe style="margin-top:20px">
          <el-table-column label="产品名称" prop="groupBuyName" align="center" min-width="80" />
          <el-table-column label="贷款状态" prop="groupBuyName" align="center" min-width="80" />
          <el-table-column label="待还总额" prop="groupBuyName" align="center" min-width="80" />
          <el-table-column label="销账金额" prop="groupBuyName" align="center" min-width="80" />
          <el-table-column label="债务类型" prop="groupBuyName" align="center" min-width="80" />
        </el-table>
      </el-tab-pane>
      
      <!-- <el-tab-pane v-for="item in tabList"
        :key="item.key"
        :label="item.label"
        :name="item.key">
        
      </el-tab-pane> -->
    </el-tabs>
    
  </div>
</template>

<script>
export default {
  name:'UserProfiles',
  data() {
    return {
      tabList:[
        {
          label:'基本信息',
          key:'first'
        },
        {
          label:'还款计划',
          key:'second'
        },{
          label:'勾销订单',
          key:'third'
        },{
          label:'接口查询债务',
          key:'fourth'
        },{
          label:'个人债务管理',
          key:'fifth'
        }
      ],
      list:[],
      activeName:'first',
      typeValue:'',
      options:[
        {
          label:'协商订单',
          key:'1'
        },{
          label:'债务查询单',
          key:'2'
        },{
          label:'催停订单',
          key:'3'
        }

      ]
    }
  },
  components: {
 
  }
}
</script>

<style lang="less" scoped>
.title{
  font-size: 16px;
  color: #333333;
  font-weight: 500;
}
.base-info{
  width: 100%;
  display: flex;
  .base-left{
    width: 60%;
    border-right:  1px dashed #ccc;
    padding-right: 20px;
    table {
      border-collapse: collapse;
      margin: 0 auto;
      text-align: center;
    }
    table td,
    table th {
      border: 1px solid #dcdee2;
      color: #666;
      height: 30px;
    }
    table thead th {
      background-color: #f7f7f7;
    }
    table tr:nth-child(odd) {
      background: #fff;
    }
    table tr:nth-child(even) {
      background: #fff;
    }
    .weChat{
      p{
        font-size: 18px;
        color: #333333;
        font-weight: 500;
      }
      .wechat-info{
        display: flex;
        align-items: center;
        img{
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
        div{
          display: flex;
          flex-direction: column;
        }
      }
    }
    .add-wechat{
      .add-wechat-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .header-left{
          .left-title{
            font-size: 18px;
            color: #333333;
            font-weight: 500;
          }
        }
        .header-right{
          // padding: 5px;
          // border: 1px solid #333333;
          // border-radius: 4px;
        }
      }
    }
  }
  .base-right{
    flex: 1;
    padding-left: 20px;
    .right-header{
      display: flex;
      // align-items: center;
      justify-content: space-between;
      p{
        font-size: 16px;
        color: #333333;
        font-weight: 500;
      }
      .sign-info{
        padding-right: 20px;
        border-right: 1px #ccc dashed;
      }
    }
  }
}
</style>
