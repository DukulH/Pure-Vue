<template>
<div class="m-4">
    <!-- <vue-element-loading :active="isActive" spinner="bar-fade-scale" color="#FF6700"/> -->
    <div class="d-flex justify-content-between">
        <div class="ms-2 mb-3">
            <h3>Order List</h3>
        </div>
        <div class="me-2 mb-3">
            <b-button @click="$router.push('/orders/create')" variant="outline-dark">
                <i class="el-icon-plus"></i>
                Add Order
            </b-button>
        </div>
    </div>

    <el-card class="box-card">
        <el-table empty-text="No Data" 
        :data="
          tableData.filter(
            (data) =>
              !search ||
              data.product_name.toLowerCase().includes(search.toLowerCase())
          )
        ">
            <el-table-column label="SN" type="index"> </el-table-column>
            <el-table-column label="Customer Name" prop="">
            </el-table-column>
            <el-table-column label="Details" prop="">
            </el-table-column>
            <el-table-column label="Total Amount" prop=""></el-table-column>
            <el-table-column label="Created" prop=""></el-table-column>
            <el-table-column align="right">
                <template slot="header" slot-scope="{}">
                    <el-input v-model="search" size="mini" placeholder="Type to search" />
                </template>
                <template slot-scope="scope">
                    <el-tooltip content="Edit" placement="bottom">
                        <el-button size="mini" id="show-modal" @click="modalData(scope.row)"><i class="el-icon-edit-outline"></i></el-button>
                    </el-tooltip>
                    <el-tooltip content="Delete" placement="bottom">
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)"><i class="el-icon-delete"></i></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <!-- <ProductEditModal :editProductData="editProductData" :show="showModal" @close="showModal = false" /> -->

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
        // modalData(row) {
        //     this.showModal = true;
        //     console.log(row)
        //     this.editProductData = row;

        // },
        getOrders() {
            axios
                .get("/backend/product/")
                .then((response) => {
                    this.tableData = response.data;
                    this.tableData.map((item) => {
                        item.sales_price = item.sales_price + ' \u09F3'
                    })
                })
                .catch((error) => {
                    console.log("Error fetching product data:", error);
                });
        },
        // handleEdit(index, row) {
        //     console.log(index, row);
        // },
        // handleDelete(id) {
        //     axios
        //         .delete(`/backend/deleteProduct/${id}`)
        //         .then((response) => {
        //             console.log(response);
        //             if (response) {
        //                 this.$notify({
        //                     type: "success",
        //                     verticalAlign: "top",
        //                     message: "Product Deleted Successfully",
        //                 });
        //                 this.tableData = this.tableData.filter((item) => item.id != id);
        //             }
        //         })
        //         .catch((error) => {
        //             console.log("Error deleting product data:", error);
        //         });
        // },
    },
    watch: {
        tableData(value) {
            if (value) {
                this.getOrders()
            }
        }
    }
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
