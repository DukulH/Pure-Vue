<template>
  <div class="m-4">
    <div class="d-flex justify-content-between">
      <div class="ms-2 mb-3">
        <h3>Product List</h3>
      </div>
      <div class="me-2 mb-3">
        <el-button @click="$router.push('product/create')" type="info" plain
          > <i class="fas fa-plus"></i> Add Product</el-button
        >
      </div>
    </div>

    <el-card class="box-card">
      <el-table
        empty-text="No Data"
        :data="
          tableData.filter(
            (data) =>
              !search ||
              data.product_name.toLowerCase().includes(search.toLowerCase())
          )
        "
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
              size="small"
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
    </el-card>
    <ProductEditModal
      :editProductData="editProductData"
      :show="showModal"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import axios from "axios";
import ProductEditModal from "@/components/product/edit_product_modal.vue";
export default {
  name: "ProductsView",
  components: {
    ProductEditModal,
  },
  data() {
    return {
      tableData: [],
      search: "",
      showModal: false,
      editProductData: {},
    };
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    modalData(row) {
      this.showModal = true;
      console.log(row);
      this.editProductData = row;
    },
    getProducts() {
      axios
        .get("/backend/product/")
        .then((response) => {
          this.tableData = response.data;
          this.tableData.map((item) => {
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
