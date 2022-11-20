<template>
  <div>
    <Header headerName="Product List"></Header>
    <div class="m-4">
      <div class="d-flex justify-content-end">
        <div class="me-2 mb-3">
          <el-button @click="$router.push('product/create')" type="info" plain
            >Add Product</el-button
          >
        </div>
      </div>

      <el-card class="box-card">
        <el-table
          empty-text="No Data"
          :data="displayData"
        >
          <el-table-column label="SN" type="index"> </el-table-column>
          <el-table-column label="Product Name" prop="product_name">
          </el-table-column>
          <el-table-column label="In Stock" prop="product_stock">
          </el-table-column>
          <el-table-column label="Price" prop="unit_price"></el-table-column>
          <el-table-column align="right">
            <template v-slot:header="{}">
              <el-input
                v-model="search"
                size="large"
                placeholder="Type to search"
              />
            </template>
            <template v-slot="scope">
              <el-tooltip content="Edit" placement="bottom">
                <el-button
                  size="small"
                  id="show-modal"
                  @click="modalData(scope.row)"
                  ><i class="fas fa-pen-to-square"></i
                ></el-button>
              </el-tooltip>
              <el-tooltip content="Delete" placement="bottom">
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.row.id)"
                  ><i class="fas fa-trash-can"></i
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <div class="d-flex justify-content-end mt-5">
          <el-pagination
            class=""
            :page-size="pageSize"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :total="total"
          >
          </el-pagination>
        </div>
      </el-card>
      <ProductEditModal
        :editProductData="editProductData"
        :show="showModal"
        @close="showModal = false"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductEditModal from "@/components/product/edit_product_modal.vue";
import Header from "../components/header/Header.vue";
import authHeader from "../components/authentication/authHeader";
export default {
  name: "ProductsView",
  components: {
    ProductEditModal,
    Header,
  },
  data() {
    return {
      tableData: [],
      search: "",
      showModal: false,
      editProductData: {},
      page: 1,
      pageSize: 10,
      total: 0,
    };
  },
  mounted() {
    this.getProducts();
  },
  computed: {
    searching() {
    if (!this.search) {
        this.total = this.tableData.length;
        return this.tableData;
    }
    this.page = 1;
    return this.tableData.filter(data => data.product_name.toLowerCase().includes(this.search.toLowerCase()));
},
displayData() {
    this.total = this.searching.length;

    return this.searching.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page);
}
},
  methods: {
    handleCurrentChange(val) {
        this.page = val;
    },
    modalData(row) {
      this.showModal = true;
      console.log(row);
      this.editProductData = row;
    },
    getProducts() {
      axios
        .get("/backend/product/", {headers: authHeader()})
        .then((response) => {
          this.tableData = response.data;
          this.tableData.map((item) => {
            item.product_name =
              item.product_name + " - " + item.product_quantity;
            item.unit_price = item.unit_price + " \u09F3";
          });
        })
        .catch((error) => {
          console.log("Error fetching product data:", error);
        });
    },
    handleDelete(id) {
      this.$confirm("Are you sure to delete this product?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          axios.delete(`/backend/deleteProduct/${id}`).then((response) => {
            if (response) {
              this.$notify({
                type: "success",
                verticalAlign: "top",
                title: "Success",
                message: "Product Deleted Successfully",
              });
              this.tableData = this.tableData.filter((item) => item.id != id);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
  },
  // watch: {
  //     tableData(value){
  //         if(value){
  //         this.getProducts()
  //         }
  //     }
  // }
};
</script>

<style scoped>
.form-panel {
  background: #ffffff;
  padding: 1em 0;
}

.el-table__empty-block {
  display: none;
}
</style>
