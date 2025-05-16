<script>
/**
 * @constant {Object} defaultStyle - Default dialog width styling
 */

const defaultStyle = { width: '400px' };

/**
 * @component
 * @description A reusable dialog component for creating and editing entities.
 * Provides a standardized interface for entity creation and editing operations.
 */
export default {
  name: "create-and-edit",
  props: {
    entity: {
      type: Object,
      required: false
    },
    visible: {
      type: Boolean,
      required: true
    },
    entityName: {
      type: String,
      required: true
    },
    edit: {
      type: Boolean,
      required: true
    },
    size: {
      type: String,
      default: 'default'
    }
  },


  /**
   * @event cancel-action-requested - Emitted when cancel button is clicked
   * @event save-action-requested - Emitted when save button is clicked. The entity data is passed as an argument
   */
  emits: ['cancel-action-requested', 'save-action-requested'],
  
  methods: {
    /**
     * Handles the cancel action and emits the 'cancel-action-requested' event
     */
    onCancel() {
      this.$emit('cancel-action-requested');
    },
    
    /**
     * Handles the save action and emits the 'save-action-requested' event with entity data
     */
    onSave() {
      this.$emit('save-action-requested', this.entity)
    },
    
    /**
     * Generates the header title based on edit mode and entity name
     * @returns {String} The formatted header title (e.g., "New Category" or "Edit Category")
     */
    getHeaderTitle() {
      return `${this.edit ? 'Editar' : 'Crear'} ${this.entityName}`;
    },
    
    /**
     * Gets the appropriate submit button label based on edit mode
     * @returns {String} The submit button label ("Update" for edit mode, "Create" for create new category mode)
     */
    getSubmitLabel() {
      return this.edit ? 'Modificar' : 'Crear';
    },
    
    /**
     * Determines the dialog style based on the size prop
     * @returns {Object} The dialog style object with appropriate width
     */
    getDialogStyle() {
      let dialogStyle = defaultStyle;
      dialogStyle = this.size === 'standard' ? { width: '600px'} : defaultStyle;
      dialogStyle = this.size === 'large' ? { width: '900px'} : defaultStyle;
      return dialogStyle;
    }
  }
}
</script>
<template>
  <pv-dialog
      :visible="visible"
      @update:visible="onCancel"
      modal
      :style="getDialogStyle()"
      class="p-fluid"
      :header="entityName"
      :closable="true"
      :dismissable-mask="true"
  >
    <template #header>
      <div class="header-title">
        <div>{{ getHeaderTitle() }}</div>
      </div>
    </template>
    <slot name="content"></slot>
    <template #footer>
      <div class="flex justify-content-end">
        <pv-button type="button" :label="getSubmitLabel()" class="p-button-text" icon="pi pi-check" @click="onSave"/>
        <pv-button type="button" label="Cancel" severity="secondary" class="p-button-text" icon="pi pi-times" @click="onCancel"/>
      </div>
    </template>
  </pv-dialog>
</template>
<style >
.header-title {
  font-size: 1.2rem;

}
</style>
