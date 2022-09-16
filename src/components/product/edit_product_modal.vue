<template>
<Transition name="EditProductModal">
    <div v-if="show" class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <slot name="header">Product Update</slot>
                </div>

                <div class="m-4">
                    <div>
                        <el-form :model="productData" :rules="rules" ref="productData" label-width="120px" class="demo-productData">
                            <el-form-item label="Product name" prop="productName">
                                <el-input v-model="productData.productName"></el-input>
                            </el-form-item>

                            <div class="row">
                                <div class="col-6">
                                    <el-form-item label="In Stock" prop="productStock">
                                        <el-input type="number" pattern="[0-9]+" min="0" v-model="productData.productStock"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="col-6">
                                    <el-form-item label="Qty( gm )" prop="productQuantity">
                                        <el-input v-model="productData.productQuantity"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-6">
                                    <el-form-item label="Sales Price" prop="salesPrice">
                                        <el-input type="number" min="0" v-model="productData.salesPrice"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="col-6">
                                    <el-form-item label="Purchase Price" prop="purchasePrice">
                                        <el-input type="number" min="0" v-model="productData.purchasePrice"></el-input>
                                    </el-form-item>
                                </div>
                            </div>

                            <el-form-item label="Product Details" prop="desc">
                                <el-input type="textarea" v-model="productData.description"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm('productData')">Update</el-button>
                                <el-button @click="$emit('close')">Close</el-button>
                            </el-form-item>
                        </el-form>
                    </div>

                </div>

            </div>
        </div>
    </div>
</Transition>
</template>

<script>
import axios from "axios";
export default {
    props: ['editProductData', 'show'],
    data() {
        return {
            productData: {
                productName: "",
                productStock: "",
                productQuantity: "",
                salesPrice: "",
                purchasePrice: "",
                description: "",
            },
            rules: {
                productName: [{
                    required: true,
                    message: "Please input product nam",
                    trigger: "change",
                }, ],
                productStock: [{
                    required: true,
                    message: "Please input stock quantity",
                    trigger: "change",
                }, ],
                productQuantity: [{
                    required: true,
                    message: "Please input product quantity in (gm)",
                    trigger: "change",
                }, ],
                salesPrice: [{
                    required: true,
                    message: "Please input sales price",
                    trigger: "change",
                }, ],
                purchasePrice: [{
                    required: true,
                    message: "Please input purchase price",
                    trigger: "change",
                }, ],

                description: [{
                    message: "Please input product description",
                    trigger: "change",
                }, ],
            },
        };
    },
    watch: {
        editProductData(val) {
            this.productData['productName'] = val.product_name
            this.productData['productStock'] = val.product_stock
            this.productData['productQuantity'] = val.product_quantity
            this.productData['salesPrice'] = parseInt(val.unit_price)
            this.productData['purchasePrice']= val.purchase_price
            this.productData['description'] =  val.desc
            this.productData["id"] = val.id
        }
    },

    methods: {
        submitForm(formName) {
            const pd_id = this.editProductData.id
            this.productData.productStock = parseInt(this.productData.productStock)
            this.productData.salesPrice = parseInt(this.productData.salesPrice)
            this.productData.purchasePrice = parseInt(this.productData.purchasePrice)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios
                        .put(`/backend/updateProduct/${pd_id}/`, this.productData)
                        .then((response) => {
                            if (response.status === 200) {
                                this.$notify({
                                    type: "success",
                                    verticalAlign: "top",
                                    message: "Product updated Successfully",
                                });
                                this.$emit('close')
                            } else {
                                this.$notify({
                                    type: "danger",
                                    verticalAlign: "top",
                                    message: "Product update failed",
                                });
                                this.$emit('close')
                            }
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    },
};
</script> 

<style>
.modal-mask {
    position: absolute;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 60%;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 10px 0;
}

.modal-default-button {
    float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
    opacity: 0;
}

.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
}

input[type="number"] {
    -moz-appearance: textfield;
}
</style>
