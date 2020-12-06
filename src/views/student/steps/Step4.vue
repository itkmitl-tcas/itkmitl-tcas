<template>
  <div class="step1-container">
    <span class="font-weight-bold title">
      ขั้นที่ 4: เสร็จสิ้น
    </span>
    <hr />

    <form class="mt-3" enctype="multipart/form-data" @submit.prevent="onSave">
      <div class="row py-5">
        <div class="col-12 pb-3 text-center">
          <h1 class="text-success font-weight-bold">
            เสร็จสิ้น
          </h1>
        </div>
        <div class="col-12 text-center">
          <b>
            ขณะนี้คณะกรรมการได้รับข้อมูลการสมัครของท่านแล้ว โปรดรอประกาศจากทางคณะ
          </b>
        </div>
        <hr />
        <div class="col-12 text-center">
          <span>
            ท่านสามารถกลับไปแก้ไขข้อมูลได้ตลอดเวลาจนกว่าจะถึงระยะเวลาปิดรับสมัคร<br />
            กรุณาเช็คข้อมูลและไฟล์ผลงานที่อัพโหลดอีกครั้ง ถ้าพบปัญหาสามารถติดเจ้าหน้าที่ได้ที่เพจ<br />
            <a target="_balnk" href="https://www.facebook.com/ITLadkrabang">Faculty of Information Technology, KMITL</a>
          </span>
        </div>
      </div>
      <div class="row field-wrapper text-center">
        <router-link :to="{ name: 'Step1' }" class="btn border border-primary text-primary mb-4 px-5 mx-auto">
          แก้ไขข้อมูล
        </router-link>
      </div>
    </form>
  </div>
</template>

<style lang="scss"></style>
