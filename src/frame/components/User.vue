<template>
  <div class="xdh-header__user">
    <slot>
      <el-dropdown @command="handleCommand">
        <div class="el-dropdown-link">
          <el-avatar shape="square" :size="32" :src="icon"></el-avatar><i class="el-icon-arrow-down el-icon--right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    text: String
  },
  methods: {
    handleCommand (command) {
      this.$message('click on item ' + command);
    }
  }
}
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  margin-top: 13px;
  cursor: pointer;
  color: rgb(186, 203, 219);
  }
</style>