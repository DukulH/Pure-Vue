<template>
  <div class="m-4">
    <!-- <vue-element-loading :active="isActive" spinner="bar-fade-scale" color="#FF6700"/> -->
    <div class="d-flex justify-content-between">
      <div class="ms-2 mb-3">
        <h3>Order List</h3>
      </div>
      <div class="me-2 mb-3">
        <el-button @click="$router.push('order/create')" type="info" plain
          > <i class=""></i> Add Order</el-button
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
              data.customer_name.toLowerCase().includes(search.toLowerCase())
          )
        "
      >
        <el-table-column label="SN" type="index"> </el-table-column>
        <el-table-column label="Customer Name" prop="customer_name">
        </el-table-column>
        <el-table-column
          label="Contact"
          prop="customer_contact"
        ></el-table-column>
        <el-table-column label="Address" prop="customer_address">
        </el-table-column>
        <el-table-column label="Total Amount" prop="total"></el-table-column>
        <el-table-column label="Created" prop="created_at"></el-table-column>
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
              <router-link class="mx-1" :to="`order/edit/${scope.row.id}`">
                <el-button size="small"
                  ><i class="fas fa-pen-to-square"></i
                ></el-button>
              </router-link>
            </el-tooltip>
            <el-tooltip content="Print" placement="bottom">
              <router-link
                class="mx-1"
                :to="`order/${scope.row.id}`"
                target="_blank"
              >
                <el-button size="small" type="info"
                  ><i class="fas fa-print"></i
                ></el-button>
              </router-link>
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "OrdersView",
  data() {
    return {
      tableData: [],
      search: "",
      showModal: false,
      editOrderData: {},
    };
  },
  mounted() {
    this.getOrders();
  },
  methods: {
    getOrders() {
      axios
        .get("/backend/order/")
        .then((response) => {
          this.tableData = response.data;
          this.tableData.map((item) => {
            item.total = item.total + " \u09F3";
            item.created_at = new Date(item.created_at).toLocaleString();
          });
          console.log(this.tableData);
        })
        .catch((error) => {
          console.log("Error fetching order data:", error);
        });
    },
    handleDelete(id) {
      this.$confirm("Are you sure to delete this order?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          axios.delete(`/backend/deleteOrder/${id}`).then((response) => {
            if (response) {
              this.$notify({
                type: "success",
                verticalAlign: "top",
                title: "Success",
                message: "Order Deleted Successfully",
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
    handlePrint() {},
  },
  // watch: {
  //     tableData(value) {
  //         if (value) {
  //             this.getOrders()
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
