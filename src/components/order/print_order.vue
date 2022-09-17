<template>
  <div style="background-color: white;">
    <Header headerName="Print Order"></Header>
    <div class="text-center mt-4">
      <el-button id="printBtnId" @click="clickToPrint" type="info"
        ><i class="fas fa-print"></i> PRINT</el-button
      >
    </div>
    <div id="PrintContent" class="p-5">
      <section class="d-flex">
        <div class="me-auto ms-2">
          <h3>Invoice</h3>
          <p>Date: {{ orderDataById.created_at }}</p>
        </div>
        <div class="ms-auto me-3">
          <img :src="logo" alt="" />
        </div>
      </section>
      <section class="d-flex mt-3">
        <div class="pageDetails me-auto ms-2">
          <h6 class="mb-4">Issued By</h6>
          <h5>
            <i class="el-icon-shopping-bag-2"></i><strong> Pure Care BD</strong>
          </h5>
          <h6><i class="el-icon-phone" /> +8801648904009</h6>
        </div>
        <div
          class="customerDetails ms-auto me-2"
          style="width: 32%; text-align: end"
        >
          <h6 class="mb-4">Issued To</h6>
          <h5><i class="fas fa-user" /> {{ orderDataById.customer_name }}</h5>
          <h5>
            <i class="fas fa-home" /> {{ orderDataById.customer_address }}
          </h5>
          <h5>
            <i class="fas fa-phone" /> {{ orderDataById.customer_contact }}
          </h5>
        </div>
      </section>
      <section class="p-4">
        <h4>Ordered Item(s)</h4>
        <table class="table mt-5">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Qty</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody class="h6">
            <tr v-for="item in orderDataById.orders" :key="item.id">
              <td>{{ item.product_name }}</td>
              <td>{{ item.quantity }}</td>
              <td>{{ item.product_price }} &#x09F3;</td>
            </tr>
            <tr>
              <td></td>
              <td><strong>Sub-Total :</strong></td>
              <td>
                <strong>{{ orderDataById.sub_total }} &#x09F3; </strong>
              </td>
            </tr>
            <tr>
              <td></td>
              <td><strong>Delivery Charge :</strong></td>
              <td>
                <strong>{{ orderDataById.delivery_charge }} &#x09F3;</strong>
              </td>
            </tr>
            <tr>
              <td></td>
              <td><strong>Discount :</strong></td>
              <td>
                <strong>{{ orderDataById.discount }} &#x09F3;</strong>
              </td>
            </tr>
            <tr>
              <td></td>
              <td><strong>Total :</strong></td>
              <td>
                <strong>{{ orderDataById.total }} &#x09F3;</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import logo from "../../assets/logo.png";
import Header from "../header/Header.vue"
export default {
  components:{
    Header
  },
  data() {
    return {
      orderDataById: {},
      logo,
    };
  },
  methods: {
    getOrderById() {
      const id = this.$route.params.id;
      axios
        .get(`/backend/orderByID/${id}/`)
        .then((response) => {
          response.data.created_at = new Date(
            response.data.created_at
          ).toLocaleDateString();
          this.orderDataById = response.data;
          console.log(this.orderDataById);
        })
        .catch((error) => {
          console.log("Error fetching order data:", error);
        });
    },
    clickToPrint() {
      let mainContent = document.getElementById("mainContent").innerHTML;
      let printable = document.getElementById("PrintContent").innerHTML;
      document.getElementById("mainContent").innerHTML = printable;
      window.print();
      document.getElementById("mainContent").innerHTML = mainContent;
    },
  },
  mounted() {
    this.getOrderById();
  },
};
</script>

<style></style>
