<template>
  <el-container class="container">
    <el-header >
      <div class="logo_box">
        <h1 style="color:#0083ca;">TOPEDIT </h1>
        <div class="line"></div>
        <h1 style="color:#0fa4b3;margin-right: 279px">Journal</h1>
      </div>
      <el-menu mode="horizontal" text-color="#606266" active-text-color="#0fa4b3">
        <el-menu-item index="1">期刊详情查询</el-menu-item>
        <el-menu-item index="2">AI智能选刊</el-menu-item>
        <el-menu-item index="3">期刊解析与推荐</el-menu-item>
        <el-menu-item index="4">iThenticate查重</el-menu-item>
        <el-menu-item index="5">关于我们</el-menu-item>
        <el-button @click="handleLoginRegister" class="custom-pink-button">登录/注册</el-button>
      </el-menu>
    </el-header>
    <div class="main-container" >
      <div class="search-container">
        <!-- 下拉菜单 -->
        <el-dropdown v-model="keywordType" @command="handleCommand">
      <span class="el-dropdown-link">
        {{ selectedLabel }}<el-icon class="el-icon--right"><ArrowDown/></el-icon>
      </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="option in options" :key="option.value" :command="option.value">
                {{ option.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-input v-model="searchKeyword" placeholder="请输入内容" style="height: 100px"></el-input>
        <el-button @click="fetchData" type="primary" style="height: 100px">查询</el-button>
      </div>
      <div class="filter-bar-container">
        <!-- 影响因子部分 -->
        <div class="filter-item">
          <label for="impactFactorMin">影响因子</label>
          <el-input v-model="ifStart2019" id="impactFactorMin" class="input-field"></el-input>
          <span>-</span>
          <el-input v-model="ifEnd2019" id="impactFactorMax" class="input-field"></el-input>
        </div>
        <!-- JCR分区部分 -->
        <div class="filter-item">
          <label for="jcrSection">JCR分区</label>
          <el-select v-model="jcr" id="jcrSection" class="select-field" placeholder="请选择">
            <el-option label="不限" value=""></el-option>
            <el-option label="Q1" value="8"></el-option>
            <el-option label="Q2" value="4"></el-option>
            <el-option label="Q3" value="2"></el-option>
            <el-option label="Q4" value="1"></el-option>
          </el-select>
        </div>
        <!-- 分区部分 -->
        <div class="filter-item">
          <label for="section">分区</label>
          <el-select v-model="section" id="section" class="select-field" placeholder="请选择">
            <el-option label="不限" value=""></el-option>
            <el-option label="一区" value="1"></el-option>
            <el-option label="二区" value="2"></el-option>
            <el-option label="三区" value="3"></el-option>
            <el-option label="四区" value="4"></el-option>
          </el-select>
        </div>
        <!-- 综述占比部分 -->
        <div class="filter-item">
          <label for="reviewRatio">综述占比</label>
          <el-select v-model="reviewRatio" id="reviewRatio" class="select-field" placeholder="请选择">
            <el-option label="不限" :value="{ start: null, end: null }"></el-option>
            <el-option label="0-5%" :value="{ start: 0, end: 5 }"></el-option>
            <el-option label="5-10%" :value="{ start: 5, end: 10 }"></el-option>
            <el-option label="10-20%" :value="{ start: 10, end: 20 }"></el-option>
            <el-option label="20-30%" :value="{ start: 20, end: 30 }"></el-option>
            <el-option label="30-50%" :value="{ start: 30, end: 50 }"></el-option>
            <el-option label="50%及以上" :value="{ start: 50, end: null }"></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <br>
    <div>

      <div class="table-box">
        <div class="card">
          <el-table :data="tableData"
                    @sort-change="handleSortChange"
                    style="width: 100%;font-size: 13px"
                    row-key="journalTitle"
                    :row-style="{height: '100px'}"
          >
            <el-table-column label="期刊名称" width="150" align="center">
              <template #default="scope">
                <div>
                  <span style="color: #303133" >{{ scope.row.journalTitle }}</span><br><br>
                  <span style="color: #909399">{{ scope.row.abbrJournal }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="journalDb" label="数据库" width="100" sortable align="center"></el-table-column>
            <el-table-column prop="impactFactor_2019" label="影响因子" width="100" align="center" sortable></el-table-column>
            <el-table-column prop="quote_factor" label="引文指标" width="100" align="center" sortable></el-table-column>
            <el-table-column prop="jcr_Json" label="JCR分区" align="center" width="100" :formatter="formatJcrJson"></el-table-column>
            <el-table-column prop="subZone" label="国内分区" width="100" align="center" sortable>
              <template #default="{ row }">
                {{ subZone(row.subZone) }}
              </template>
            </el-table-column>
            <el-table-column prop="annualPublication" label="年发文量" align="center" width="100" sortable></el-table-column>
            <el-table-column prop="totalReviewRatio" label="综述占比" align="center" width="100" sortable>
              <template #default="{ row }">
                {{ Percentage(row.totalReviewRatio) }}
              </template>
            </el-table-column>
            <el-table-column prop="open_ratio" label="是否开源/开源占比" width="85" align="center" sortable>
              <template #default="{ row }">
                {{ formatPercentage(row.open_ratio) }}
              </template>
            </el-table-column>
            <el-table-column prop="isDomestic" label="是否国产" align="center" width="110">
              <template #default="{ row }">
                {{ isDomestic(row.isDomestic) }}
              </template>
            </el-table-column>
          </el-table>
        </div>

      </div>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          :current-page.sync="currentPage"
          background
          layout=" prev, pager, next, jumper"
          :total="3140">
      </el-pagination>
    </div>
  </el-container>


</template>

<script setup>
import { onMounted, ref, watch ,computed} from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import {ArrowDown} from "@element-plus/icons-vue";

const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(10);
const keywordType = ref('issn');
const searchKeyword = ref('');
const ifStart2019 = ref('');
const ifEnd2019 = ref('');
const jcr = ref('');
const section = ref('');
const reviewRatio = ref('');

// 监听筛选条件变化，选择一个可直接进行更新
watch([ifStart2019, ifEnd2019, jcr, section, reviewRatio], () => {
  fetchData();
});

const fetchData = async () => {
  await getData();
};

const getData = async () => {
  try {
    const url = '/api/api/v1/journal/search';
    const params = {
      keywordType: keywordType.value,
      keyword: searchKeyword.value,
      ifStart_2019: ifStart2019.value,
      ifEnd_2019: ifEnd2019.value,
      jcr: jcr.value,
      sub: section.value,
      trrl: reviewRatio.value.start,
      trrr: reviewRatio.value.end,
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      selfCitingRate: 'all',
      compatriotRate: 'all',
      totalReviewRatio: 'all',
      categoryId: '1e78b26454e2878930f44c6a571be497',
      order: '',
      orderType: ''
    };
    /*https://ijournal.topeditsci.com/search?keywordType=title&keyword=&ifStart2019=&ifEnd2019=&jcr=&sub=&isDomestic=&selfCitingRate=all&compatriotRate=all&totalReviewRatio=all&categoryId=1e78b26454e2878930f44c6a571be497&pageNum=1&order=&orderType=*/
    const response = await axios.get(url, { params });
    tableData.value = response.data.data_original.data;
    console.log(tableData.value);
  } catch (error) {
    console.error('请求出错:', error);
    ElMessage.error('请求出错，请检查网络连接');
  }
};
// 定义选项
const options = [
  { label: 'ISSN', value: 'issn' },
  { label: '期刊名称', value: 'title' },
  { label: '简述', value: 'abbr' },
  { label: '学科分类', value: 'category' },
];

// 计算选中的标签
const selectedLabel = computed(() => {
  const option = options.find((item) => item.value === keywordType.value);
  return option ? option.label : '请选择';
});

// 处理下拉菜单的选中事件
const handleCommand = (command) => {
  keywordType.value = command;
};

const   formatPercentage=(value)=> {
  if (value !== undefined && value !== null) {
    return (value * 100).toFixed(2) + '%';
  }
  return '-';
}

const Percentage=(value)=> {
  if (value !== undefined && value !== null) {
    return value + '%';
  }
  return '-';
}

const isDomestic=(value)=> {
  if (value !== undefined && value !== null) {
    return '否';
  }
  return '是';
}

const subZone=(value)=> {
  let result;
  switch (value) {
    case 1:
      result = "1区";
      break;
    case 2:
      result = "2区";
      break;
    case 3:
      result = "3区";
      break;
    case 4:
      result = "4区";
      break;
    default:
      result = "-";
      break;
  }
  return result;
}

const formatJcrJson = (row, column, cellValue) => {
  // 解析 JSON 字符串
  try {
    const data = JSON.parse(cellValue);
    if (Array.isArray(data) && data.length > 0) {
      return data[0].sub || "-"; // 如果 sub 不存在，返回 "-"
    }
  } catch (error) {
    console.error("Invalid JSON format", error);
  }
  return "-"; // 默认返回 "-"
}
//排序
const handleSortChange = ({ prop, order }) => {
  if (order === 'ascending') {
    tableData.value.sort((a, b) => (a[prop] > b[prop] ? 1 : -1));
  } else if (order === 'descending') {
    tableData.value.sort((a, b) => (a[prop] < b[prop] ? 1 : -1));
  }
};

const handleSizeChange = (newSize) => {
  pageSize.value = newSize;
  currentPage.value = 1; // 每页数量变化时，重置页码为 1
  fetchData();
};

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
  fetchData(); // 当前页码变化时，重新获取数据
};


onMounted(async () => {
  await getData();
});
</script>

<style scoped>
.el-header {
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 51px;
}
body{
  width: 100%;
  height: 100%;
}
.el-header h1 {
  margin: 0;
}

.el-header .el-menu {
  display: flex;
  gap: 20px;
  height: 30px;
  border: none;
}

.el-header .el-menu .el-menu-item {
  border-left: 1px solid rgba(0, 0, 0, .2);
}

.el-main {

}

.input-with-select .el-input-group__append {
  background-color: #0fa4b3;
}

.line {
  width: 1px;
  height: 30px;
  background: rgba(0, 0, 0, .2);
  margin: 0 16px;
}

.logo_box {
  display: flex;
}

.custom-pink-button {
  background-color: #0fa4b3;
  color: white;
  border: none;
  width: 90px;
  border-radius: 1px;
  padding: 8px 16px;
  margin: 0;
}

.custom-pink-button:hover,
.custom-pink-button:focus {
  background-color: #6aaeb4;
  color: white;
  border: none;
}

.custom-pink-button:active {
  background-color: #6aaeb4;
  color: white;
  border: none;
}

.card {
  border-radius: 2px;
  padding: 20px;
  width: 80%;
  background-color: white;

}

.table-box {
  display: flex;
  justify-content: center;
  padding: 18px 0;
  background-color: #f6f6f8;
}

.el-pagination { /*选择分页组件，默认采取Flex布局*/
  justify-content: center; /*水平方向居中对齐*/
  margin-top: 8px;
}

.search-container {
  display: flex;
  align-items: center;
  border: 1px solid #0fa4b3;
  border-radius: 1px;
  overflow: hidden;
  width: 50%;
  height: 50px;
  margin: auto;
}

.search-container .el-select,
.search-container .el-input {
  border: none;
  outline: none;
}

.search-container .el-input {
  flex-grow: 1;
}

.search-container .el-button {
  background-color: #0fa4b3;
  color: white;
  border: none;
  padding: 16px 16px;
  cursor: pointer;
}

.filter-bar-container {
  display: flex;
  gap: 16px; /* 项目之间的间距 */
  align-items: center; /* 垂直居中 */
  margin-left: 180px;
  margin-top: 50px;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 8px; /* 子元素之间的间距 */
  margin-right: 90px;
}

.input-field,
.select-field {
  padding: 6px 8px; /* 内边距 */
  width: 100px;
}

.input-field {
  width: 60px;
}

label {
  font-size: 14px;
}
.el-dropdown-link {
  color: #9e9399;
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}
.el-select-dropdown__item.is-selected {
  color: #0fa4b3 !important; /* 设置选中项的文字颜色 */
  font-weight: bold;
}
</style>

