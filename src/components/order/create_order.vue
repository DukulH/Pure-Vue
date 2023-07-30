<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
  <div>
    <Header headerName="Order Create"></Header>
    <div
      class="m-4"
      v-loading="loading"
      :active="show_loader"
      element-loading-text="Loading..."
    >
      <div class="d-flex justify-content-between">
        <div class="ms-2 mb-3">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>Orders</el-breadcrumb-item>
            <el-breadcrumb-item>Create Order</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="me-2 mb-3">
          <el-button-group>
            <el-button @click="goBackFunction" type="info">Back</el-button>
            <el-button @click="orderListFunction" type="info" plain>
              <i class=""></i> Order List
            </el-button>
          </el-button-group>
        </div>
      </div>
      <el-card class="box-card" v-loading="show_loader">
        <div class="w-100 mt-4">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
            class="demo-ruleForm"
          >
            <div class="row">
              <div class="col-6">
                <el-form-item label="CustomerName" prop="customer_name">
                  <el-input v-model="ruleForm.customer_name"></el-input>
                </el-form-item>
              </div>
              <div class="col-4">
                <el-form-item label="Contact" prop="contact_number">
                  <el-input
                    type="number"
                    pattern="[0-9]+"
                    v-model="ruleForm.contact_number"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <el-form-item class="col-10" label="Address" prop="address">
              <el-input v-model="ruleForm.address"></el-input>
            </el-form-item>

            <el-tabs type="border-card" style="width: 83.5%">
              <el-tab-pane label="Select Products">
                <div style="align: left">
                  <el-select
                    no-data-text="Empty"
                    v-model="onSelectProductValue"
                    @change="getSelectedProduct"
                    filterable
                    placeholder="Select"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.id"
                      :label="item.product_name"
                      :value="item.id"
                    >
                    </el-option>
                  </el-select>
                </div>
                <div class="mt-4">
                  <el-table
                    empty-text="No Data"
                    :data="selectedProducts"
                    style="width: 100%"
                  >
                    <el-table-column type="index" label="#" width="50">
                    </el-table-column>
                    <el-table-column
                      prop="product_name"
                      label="Product Name"
                      width="200"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="unit_price"
                      label="Unit Price"
                      width="150"
                    >
                    </el-table-column>
                    <el-table-column
                      label="Quantity"
                      prop="quantity"
                      width="150"
                    >
                      <template v-slot="scope">
                        <el-input-number
                          v-model="scope.row.quantity"
                          @change="setSelectedProductTotal(scope.row.id)"
                          size="small"
                          :min="1"
                          :controls="false"
                        ></el-input-number>
                      </template>
                    </el-table-column>

                    <el-table-column label="Total Price" width="150">
                      <template v-slot="scope">
                        <el-input
                          v-model="scope.row.product_price"
                          :readonly="true"
                        ></el-input>
                      </template>
                    </el-table-column>

                    <el-table-column width="150">
                      <template v-slot="scope">
                        <el-button
                          @click.native.prevent="
                            deleteRow(scope.$index, selectedProducts)
                          "
                          type="text"
                        >
                          <i class="fas fa-trash"></i>
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>

                  <div v-if="selectedProducts.length">
                    <div class="d-flex mb-2">
                      <div style="width: 530px; color: #909399">
                        <small class="float-end">Sub Total:</small>
                      </div>
                      <div style="width: 100px; color: #909399">
                        <small class="float-end">{{ sub_total }}/-</small>
                      </div>
                    </div>
                    <div class="d-flex mb-2">
                      <div style="width: 530px; color: #909399">
                        <small class="float-end">Delivery charge:</small>
                      </div>
                      <div class="ms-5" style="width: 100px; color: #909399">
                        <el-input
                          type="number"
                          pattern="[0-9]+"
                          v-model="ruleForm.delivery_charge"
                          :min="0"
                          size="small"
                          placeholder="Delivery charge"
                          :controls="false"
                        ></el-input>
                      </div>
                    </div>
                    <div class="d-flex mb-2">
                      <div style="width: 530px; color: #909399">
                        <small class="float-end">Disount:</small>
                      </div>
                      <div class="ms-5" style="width: 100px; color: #909399">
                        <el-input
                          type="number"
                          pattern="[0-9]+"
                          size="small"
                          :min="0"
                          placeholder="Disount"
                          v-model="ruleForm.discount"
                          :controls="false"
                        ></el-input>
                      </div>
                    </div>
                    <div class="d-flex mb-2">
                      <div style="width: 530px; color: #909399">
                        <small class="float-end">Total:</small>
                      </div>
                      <div style="width: 100px; color: #909399">
                        <small class="float-end">{{ total }}/-</small>
                      </div>
                    </div>
                    <div class="d-flex align-items-center mb-2">
                      <div style="width: 80px; color: #909399">
                        <small class="float-start">Instruction:</small>
                      </div>
                      <div style="width: 650px; color: #909399">
                        <el-input
                          type="text"
                          v-model="ruleForm.instruction"
                          size="small"
                          placeholder="Instruction"
                          :controls="false"
                        ></el-input>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
            <el-form-item class="mt-5">
              <el-button
                type="info"
                style="background-color: #010101"
                @click="submitForm('ruleForm')"
                >Create</el-button
              >
              <el-button @click="resetForm('ruleForm')">Reset</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "../header/Header.vue";
import authHeader from "../authentication/authHeader";
export default {
  name: "CreateOrder",
  components: {
    Header,
  },
  data() {
    return {
      show_loader: false,
      onSelectProductValue: "",
      options: [],
      selectedProducts: [],
      total_price: null,
      ruleForm: {
        customer_name: "",
        contact_number: "",
        address: "",
        discount: 0,
        delivery_charge: 0,
        sub_total: 0,
        total: 0,
        instruction: "",
      },
      rules: {
        customer_name: [
          {
            required: true,
            message: "Please insert customer name",
            trigger: "change",
          },
        ],
        contact_number: [
          {
            required: true,
            message: "Insert valid contact number",
            trigger: "change",
            min: 11,
            max: 11,
          },
        ],
        address: [
          {
            required: true,
            message: "Please insert address",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    sub_total: function () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.ruleForm.sub_total = this.selectedProducts.reduce(
        (accumulator, object) => {
          return accumulator + object.product_price;
        },
        0
      );
      return this.ruleForm.sub_total;
    },
    total: function () {
      if (this.ruleForm.discount) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.ruleForm.total =
          parseInt(this.ruleForm.sub_total) +
          parseInt(this.ruleForm.delivery_charge) -
          parseInt(this.ruleForm.discount);
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.ruleForm.total = this.ruleForm.total =
          parseInt(this.ruleForm.sub_total) +
          parseInt(this.ruleForm.delivery_charge);
      }
      return this.ruleForm.total;
    },
  },
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
      this.onSelectProductValue = "";
    },
    getSelectedProduct() {
      let selectedProductDetails = this.options.find(
        (s) => s.id === this.onSelectProductValue
      );
      selectedProductDetails["quantity"] = 1;
      selectedProductDetails["product_price"] = parseInt(
        selectedProductDetails.unit_price
      );
      this.selectedProducts.push(selectedProductDetails);
    },
    getProducts() {
      this.show_loader = true;
      axios
        .get("/backend/product/", { headers: authHeader() })
        .then((response) => {
          this.show_loader = false;
          this.options = response.data;
          this.options.map((item) => {
            item.product_name =
              item.product_name + " - " + item.product_quantity;
          });
        })
        .catch((error) => {
          this.show_loader = false;
          console.log("Error fetching product data:", error);
        });
    },
    setSelectedProductTotal(id) {
      let temp = this.selectedProducts.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            product_price: item.unit_price * item.quantity,
          };
        } else {
          return item;
        }
      });
      this.selectedProducts = temp;
    },
    goto_list() {
      this.$router.push("/orders");
    },
    goBackFunction() {
      this.$router.go(-1);
    },
    orderListFunction() {
      this.$router.push("/orders");
    },
    submitForm(formName) {
      this.show_loader = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.selectedProducts.length) {
            this.ruleForm["orderedProducts"] = this.selectedProducts;
            console.log(this.ruleForm);
            axios
              .post("/backend/createOrder/", this.ruleForm, {
                headers: authHeader(),
              })
              .then((response) => {
                this.show_loader = false;
                if (response) {
                  this.$notify({
                    type: "success",
                    title: "Success",
                    verticalAlign: "top",
                    message: "Order created successfully",
                  });
                  this.$refs[formName].resetFields();
                  this.selectedProducts = [];
                  this.onSelectProductValue = "";
                  this.ruleForm.discount = 0;
                  this.ruleForm.delivery_charge = 0;
                }
              });
          } else {
            this.show_loader = false;
            this.$notify({
              type: "error",
              verticalAlign: "top",
              title: "Error",
              message: "Please select products",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.selectedProducts = [];
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
    },
    Discount(val) {
      if (val) {
        console.log(val);
      }
    },
  },
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
