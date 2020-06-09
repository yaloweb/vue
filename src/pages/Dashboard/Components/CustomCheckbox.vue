<template>
    <div class="custom-checkbox">
        <label class="custom-checkbox-label">
            <input :type="type"
                   :name="name"
                   :checked="checked">
            <span></span>
        </label>
    </div>
</template>

<script>
  export default {
    name: 'custom-checkbox',
    props: {
      type: String,
      name: String,
      checked: Boolean
    },
    methods: {}
  }
</script>

<style>
    .custom-checkbox-label {
        display: inline-flex;
        width: auto;
        margin: 0;
        position: relative;
        cursor: pointer;
    }

    .custom-checkbox-label input {
        opacity: 0;
        position: absolute;
        z-index: -1;
        visibility: hidden;
    }

    .custom-checkbox-label input:checked + span:after {
        transform: scale(1);
    }

    .custom-checkbox-label span {
        display: inline-block;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 1px solid #17a2b8;
        position: relative;
    }

    .custom-checkbox-label span:after {
        content: '';
        transition: all .3s ease;
        position: absolute;
        width: 18px;
        height: 18px;
        left: 2px;
        top: 2px;
        border-radius: 50%;
        background-color: #17a2b8;
        transform: scale(0);
    }
</style>