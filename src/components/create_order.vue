<template>
<div class="m-4" v-loading.fullscreen.lock="show_loader">
    <div class="d-flex justify-content-between">
        <div class="ms-2 mb-3">
            <h3 class="mb-2">Order Create</h3>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>Orders</el-breadcrumb-item>
                <el-breadcrumb-item>Add Order</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="me-2 mb-3">
            <el-button-group>
                <b-button class="me-1" @click="goBackFunction" variant="outline-dark">
                    <i class="el-icon-back"></i>
                    Back
                </b-button>
                <b-button @click="productListFunction" variant="outline-dark">
                    <i class="el-icon-tickets"></i>
                    Order List
                </b-button>
            </el-button-group>
        </div>
    </div>
    <el-card class="box-card">
        <div class="w-100 mt-4">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <div class="row">
                    <div class="col-6">
                        <el-form-item label="CustomerName" prop="customer_name">
                            <el-input v-model="ruleForm.customer_name"></el-input>
                        </el-form-item>
                    </div>
                    <div class="col-4">
                        <el-form-item label="Contact" prop="contact_number">
                            <el-input type="number" pattern="[0-9]+" min="11" max="11" v-model="ruleForm.contact_number"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <el-form-item class="col-10" label="Address" prop="address">
                    <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>

                <el-tabs type="border-card" style="width:83.5%">
                    <el-tab-pane label="Select Products">
                        <div style="align:left">
                            <el-select no-data-text="Empty" v-model="onSelectProductValue" @change="getSelectedProduct" filterable placeholder="Select">
                                <el-option v-for="item in options" :key="item.id" :label="item.product_name" :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="mt-4">
                            <el-table empty-text="No Data" :data="selectedProducts" style="width:100%">
                                <el-table-column type="index" label="#" width="50">
                                </el-table-column>
                                <el-table-column prop="product_name" label="Product Name" width="200">
                                </el-table-column>
                                <el-table-column prop="sales_price" label="Unit Price" width="150">
                                </el-table-column>
                                <el-table-column label="Quantity" prop="quantity" width="150">
                                    <template slot-scope="scope">
                                        <el-input-number v-model="scope.row.quantity" @change="setSelectedProductTotal(scope.row.id)" size="small" :min="1" :controls="false"></el-input-number>
                                    </template>
                                </el-table-column>

                                <el-table-column prop="producPrice" label="Total Price" width="150">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.productPrice" :readonly="true"></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column width="150">
                                    <template slot-scope="scope">
                                        <el-button @click.native.prevent="deleteRow(scope.$index, selectedProducts)" type="text">
                                            <i class="el-icon-delete"></i>
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="d-flex">
                                    <div class="border" style="width:530px" ><small class="float-end">Sub Total:</small></div>
                                    <div class="border" style="width:150px"><small class="text-center">200</small></div>
                                </div>
                        </div>

                    </el-tab-pane>
                </el-tabs>
                <el-form-item class="mt-5">
                    <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
                    <el-button @click="resetForm('ruleForm')">Reset</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: "CreateOrder",
    data() {
        return {
            show_loader: false,
            onSelectProductValue: '',
            options: [],
            selectedProducts: [],
            total_price: null,
            ruleForm: {
                customer_name: "",
                contact_number: "",
                address: "",
            },
            rules: {
                customer_name: [{
                    required: true,
                    message: "Please insert customer name",
                    trigger: "change",
                }, ],
                contact_number: [{
                    required: true,
                    message: "Please insert contact number",
                    trigger: "change",
                }, ],
                address: [{
                    required: true,
                    message: "Please insert address",
                    trigger: "change",
                }, ],
            },
        };
    },
    methods: {
        onlyNumber(evt) {
            evt = evt ? evt : window.event;
            var charCode = evt.which ? evt.which : evt.keyCode;
            if (
                charCode > 31 &&
                (charCode < 48 || charCode > 57) &&
                charCode !== 46
            ) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        deleteRow(index, rows) {
            rows.splice(index, 1);
        },
        getSelectedProduct() {
            let selectedProductDetails = this.options.find((s) => s.id === this.onSelectProductValue)
            selectedProductDetails["quantity"] = 1
            selectedProductDetails["productPrice"] = selectedProductDetails.sales_price
            this.selectedProducts.push(selectedProductDetails)
        },
        getProducts() {
            this.show_loader = true
            axios
                .get("/backend/product/")
                .then((response) => {
                    this.show_loader = false
                    this.options = response.data;
                })
                .catch((error) => {
                    this.show_loader = false
                    console.log("Error fetching product data:", error);
                });
        },
        setSelectedProductTotal(id) {
            let temp = this.selectedProducts.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        productPrice: item.sales_price * item.quantity
                    }
                } else {
                    return item
                }
            })
            this.selectedProducts = temp
        },
        goto_list() {
            this.$router.push("/orders");
        },
        goBackFunction() {
            this.$router.go(-1);
        },
        productListFunction() {
            this.$router.push("/orders");
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm["orderedProducts"] = this.selectedProducts
                    console.log(this.ruleForm);
                    // axios
                    //     .post("/backend/createProduct/", this.ruleForm)
                    //     .then((response) => {
                    //         if (response) {
                    //             this.$notify({
                    //                 type: "success",
                    //                 verticalAlign: "top",
                    //                 message: "Product added Successfully",
                    //             });
                    //             this.goto_list();
                    //         }
                    //     });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
    mounted() {
        this.getProducts();
    },
    watch: {
        selectedProducts(val) {
            if (val) {
                console.log(val);
            }
        }
    }
};
</script> 

<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
}

input[type="number"] {
    -moz-appearance: textfield;
}
</style>
