<script>
import ElScrollbar from 'element-ui/packages/scrollbar';
import CascaderNode from './cascader-node.vue';
import Locale from 'element-ui/src/mixins/locale';
import { generateId } from 'element-ui/src/utils/util';
import ElCheckbox from 'element-ui/packages/checkbox';

export default {
  name: 'ElCascaderMenu',

  mixins: [Locale],

  inject: ['panel'],

  components: {
    ElCheckbox,
    ElScrollbar,
    CascaderNode
  },

  props: {
    nodes: {
      type: Array,
      required: true
    },
    index: Number
  },

  data() {
    return {
      activeNode: null,
      hoverTimer: null,
      checkAll: false, // 是否全选
      // indeterminate: false, // checkbox 的不确定状态，一般用于实现全选的效果
      id: generateId()
    };
  },

  computed: {
    isEmpty() {
      return !this.nodes.length;
    },
    menuId() {
      return `cascader-menu-${this.id}-${this.index}`;
    },
    indeterminate() {
      // let len = this.panel.checkedValue.length // 选中项是所有项的，不合适
      let checkedLen = 0,
        nodesLen = this.nodes.length;
      this.nodes.forEach(node => {
        node.checked && checkedLen ++
      });
      console.log(checkedLen, checkedLen !== 0 && checkedLen < this.nodes.length)
      if (checkedLen === 0) this.checkAll = false 
      if (checkedLen === nodesLen) this.checkAll = true 
      return checkedLen !== 0 && checkedLen < nodesLen // 选中项!==0 && 选中项 < nodes所有选项
    }
  },

  methods: {
    handleExpand(e) {
      this.activeNode = e.target;
    },
    handleMouseMove(e) {
      const { activeNode, hoverTimer } = this;
      const { hoverZone } = this.$refs;

      if (!activeNode || !hoverZone) return;

      if (activeNode.contains(e.target)) {
        clearTimeout(hoverTimer);

        const { left } = this.$el.getBoundingClientRect();
        const startX = e.clientX - left;
        const { offsetWidth, offsetHeight } = this.$el;
        const top = activeNode.offsetTop;
        const bottom = top + activeNode.offsetHeight;

        hoverZone.innerHTML = `
          <path style="pointer-events: auto;" fill="transparent" d="M${startX} ${top} L${offsetWidth} 0 V${top} Z" />
          <path style="pointer-events: auto;" fill="transparent" d="M${startX} ${bottom} L${offsetWidth} ${offsetHeight} V${bottom} Z" />
        `;
      } else if (!hoverTimer) {
        this.hoverTimer = setTimeout(this.clearHoverZone, this.panel.config.hoverThreshold);
      }
    },
    clearHoverZone() {
      const { hoverZone } = this.$refs;
      if (!hoverZone) return;
      hoverZone.innerHTML = '';
    },

    renderEmptyText(h) {
      return (
        <div class="el-cascader-menu__empty-text">{ this.t('el.cascader.noData') }</div>
      );
    },
    // 全选按钮change事件
    handleMultiCheckChange(checked) {
      this.checkAll = checked;
      this.nodes.map((node) => {
        node.checked = checked
        node.doCheck(checked);
      })
      this.panel.calculateMultiCheckedValue(); // 选中每个节点
    },
    // 渲染“全选”按钮
    renderCheckbox(h) {
      const { node, checkAll, indeterminate } = this;
      const events = {
        on: { change: this.handleMultiCheckChange },
        nativeOn: {}
      };
     
      return (
        <el-checkbox
          value={ checkAll }
          class="checked-all-btn"
          indeterminate={ indeterminate }
          { ...events }
        >全选</el-checkbox>
      );
    },
    renderNodeList(h) {
      const { menuId } = this;
      const { isHoverMenu } = this.panel;
      const events = { on: {} };

      if (isHoverMenu) {
        events.on.expand = this.handleExpand;
      }
      const nodes = this.nodes.map((node, index) => {
        const { hasChildren } = node;
        return (
            <cascader-node
              key={ node.uid }
              node={ node }
              node-id={ `${menuId}-${index}` }
              aria-haspopup={ hasChildren }
              aria-owns = { hasChildren ? menuId : null }
              { ...events }></cascader-node>
          );
      });
      return [
        this.renderCheckbox(h),
        ...nodes,
        isHoverMenu ? <svg ref='hoverZone' class='el-cascader-menu__hover-zone'></svg> : null
      ];
    }
  },
  
  render(h) {
    const { isEmpty, menuId } = this;
    const events = { nativeOn: {} };

    // optimize hover to expand experience (#8010)
    if (this.panel.isHoverMenu) {
      events.nativeOn.mousemove = this.handleMouseMove;
      // events.nativeOn.mouseleave = this.clearHoverZone;
    }

    return (
      <el-scrollbar
        tag="ul"
        role="menu"
        id={ menuId }
        class="el-cascader-menu"
        wrap-class="el-cascader-menu__wrap"
        view-class={{
          'el-cascader-menu__list': true,
          'is-empty': isEmpty
        }}
        { ...events }>
        { isEmpty ? this.renderEmptyText(h) : this.renderNodeList(h) }
      </el-scrollbar>
    );
  }
};
</script>
