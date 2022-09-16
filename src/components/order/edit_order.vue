<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<template>
  <div
    class="m-4"
    v-loading="loading"
    :active="show_loader"
    element-loading-text="Loading..."
  >
    <div class="d-flex justify-content-between">
      <div class="ms-2 mb-3">
        <h3 class="mb-2">Update Order</h3>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>Orders</el-breadcrumb-item>
          <el-breadcrumb-item>Update Order</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="me-2 mb-3">
        <el-button-group>
          <el-button @click="goBackFunction" type="info">Order List</el-button>
        </el-button-group>
      </div>
    </div>
    <el-card class="box-card">
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
              <el-form-item label="CustomerName" prop="up_customer_name">
                <el-input v-model="ruleForm.up_customer_name"></el-input>
              </el-form-item>
            </div>
            <div class="col-4">
              <el-form-item label="Contact" prop="up_contact_number">
                <el-input
                  type="number"
                  pattern="[0-9]+"
                  v-model="ruleForm.up_contact_number"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <el-form-item class="col-10" label="Address" prop="up_address">
            <el-input v-model="ruleForm.up_address"></el-input>
          </el-form-item>

          <el-tabs type="border-card" style="width: 100%">
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
                  <el-table-column label="Quantity" prop="quantity" width="150">
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

                  <el-table-column
                    prop="producPrice"
                    label="Total Price"
                    width="150"
                  >
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
                        <i class="el-icon-delete"></i>
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
                      <small class="float-end">{{ up_sub_total }}/-</small>
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
                        v-model="ruleForm.up_delivery_charge"
                        :min="0"
                        size="mini"
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
                        size="mini"
                        :min="0"
                        placeholder="Disount"
                        v-model="ruleForm.up_discount"
                        :controls="false"
                      ></el-input>
                    </div>
                  </div>
                  <div class="d-flex mb-2">
                    <div style="width: 530px; color: #909399">
                      <small class="float-end">Total:</small>
                    </div>
                    <div style="width: 100px; color: #909399">
                      <small class="float-end">{{ up_total }}/-</small>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
          <el-form-item class="mt-3 text-start">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >update</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      show_loader: false,
      onSelectProductValue: "",
      options: [],
      selectedProducts: [],
      total_price: null,
      order_id: null,
      ruleForm: {
        up_customer_name: "",
        up_contact_number: "",
        up_address: "",
        up_discount: 0,
        up_delivery_charge: 0,
        up_sub_total: 0,
        up_total: 0,
      },
      rules: {
        up_customer_name: [
          {
            required: true,
            message: "Please insert customer name",
            trigger: "change",
          },
        ],
        up_contact_number: [
          {
            required: true,
            message: "Insert valid contact number",
            trigger: "change",
            min: 11,
            max: 11,
          },
        ],
        up_address: [
          {
            required: true,
            message: "Please insert up_address",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {
    up_sub_total: function () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.ruleForm.up_sub_total = this.selectedProducts.reduce(
        (accumulator, object) => {
          return accumulator + object.product_price;
        },
        0
      );
      return this.ruleForm.up_sub_total;
    },
    up_total: function () {
      if (this.ruleForm.up_discount) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.ruleForm.up_total =
          parseInt(this.ruleForm.up_sub_total) +
          parseInt(this.ruleForm.up_delivery_charge) -
          parseInt(this.ruleForm.up_discount);
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.ruleForm.up_total = this.ruleForm.up_total =
          parseInt(this.ruleForm.up_sub_total) +
          parseInt(this.ruleForm.up_delivery_charge);
      }
      return this.ruleForm.up_total;
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
        .get("/backend/product/")
        .then((response) => {
          this.show_loader = false;
          this.options = response.data;
        })
        .catch((error) => {
          this.show_loader = false;
          console.log("Error fetching product data:", error);
        });
    },
    setSelectedProductTotal(id) {
      console.log(id);
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
    productListFunction() {
      this.$router.push("/orders");
    },
    getOrderById() {
      const id = this.$route.params.id;
      axios
        .get(`/backend/orderByID/${id}/`)
        .then((response) => {
          this.ruleForm["up_customer_name"] = response.data.customer_name;
          this.ruleForm["up_address"] = response.data.customer_address;
          this.ruleForm["up_contact_number"] = response.data.customer_contact;
          this.ruleForm["up_discount"] = parseInt(response.data.discount);
          this.ruleForm["up_delivery_charge"] = parseInt(
            response.data.delivery_charge
          );
          this.ruleForm["up_sub_total"] = parseInt(response.data.sub_total);
          this.ruleForm["up_total"] = parseInt(response.data.total);
          this.selectedProducts = response.data.orders;
          this.order_id = response.data.id;
        })
        .catch((error) => {
          console.log("Error fetching order data:", error);
        });
    },
    submitForm(formName) {
      this.show_loader = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.selectedProducts.length) {
            this.ruleForm["orderedProducts"] = this.selectedProducts;
            this.ruleForm["order_id"] = this.order_id;
            axios
              .put(`/backend/updateOrder/${this.order_id}/`, this.ruleForm)
              .then((response) => {
                this.show_loader = false;
                if (response) {
                  this.$notify({
                    type: "success",
                    title: "Success",
                    verticalAlign: "top",
                    message: "Order updated successfully",
                  });
                  this.goto_list();
                }
              })
              .catch((error) => {
                console.log("Error from update order", error);
              });
            console.log(this.ruleForm);
          } else {
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
    goto_list() {
      this.$router.push("/orders");
    },
  },
  mounted() {
    this.getProducts();
    this.getOrderById();
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
  width: 68%;
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
