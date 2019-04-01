<template>
<div class="contain">
  <div class="Grid Grid--gutters u-textCenter">
    <div class="Grid-cell">
      <div class="Demo">1/2</div>
    </div>
    <div class="Grid-cell">
      <div class="Demo">1/2</div>
    </div>
  </div>

<div class="Grid Grid--gutters u-textCenter">
  <div class="Grid-cell">
    <div class="Demo">1/3</div>
  </div>
  <div class="Grid-cell">
    <div class="Demo">1/3</div>
  </div>
  <div class="Grid-cell">
    <div class="Demo">1/3</div>
  </div>
</div>

<div class="Grid Grid--gutters u-textCenter">
  <div class="Grid-cell">
    <div class="Demo">1/4</div>
  </div>
  <div class="Grid-cell">
    <div class="Demo">1/4</div>
  </div>
  <div class="Grid-cell">
    <div class="Demo">1/4</div>
  </div>
  <div class="Grid-cell">
    <div class="Demo">1/4</div>
  </div>
</div>

<div class="Grid Grid--gutters Grid--flexCells">
  <div class="Grid-cell">
    <div class="Demo">
      Full-height, even when my content doesn't fill the space.
    </div>
  </div>
  <div class="Grid-cell">
    <div class="Demo">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mollis velit non gravida venenatis. Praesent consequat lectus purus, ut scelerisque velit condimentum eu. Maecenas sagittis ante ut turpis varius interdum. Quisque tellus ipsum, eleifend non ipsum id, suscipit ultricies neque.
    </div>
  </div>
</div>



<h3>Individual Sizing</h3>
<p>When equal widths aren’t what you want, you can add sizing classes to individual cells. Cells without sizing classes simply divide up the remaining space as normal.</p>
<p>The cells below labeled “auto” do not have sizing classes specified.</p>
<div class="Grid Grid--gutters u-textCenter">
  <div class="Grid-cell u-1of2">
    <div class="Demo">1/2</div>
  </div>
  <div class="Grid-cell">
    <div class="Demo">auto</div>
  </div>
  <div class="Grid-cell">
    <div class="Demo">auto</div>
  </div>
</div>
<div class="Grid Grid--gutters u-textCenter">
  <div class="Grid-cell">
    <div class="Demo">auto</div>
  </div>
  <div class="Grid-cell u-1of3">
    <div class="Demo">1/3</div>
  </div>
</div>
<div class="Grid Grid--gutters u-textCenter">
  <div class="Grid-cell u-1of4">
    <div class="Demo">1/4</div>
  </div>
  <div class="Grid-cell">
    <div class="Demo">auto</div>
  </div>
  <div class="Grid-cell u-1of3">
    <div class="Demo">1/3</div>
  </div>
</div>



<h3>Responsive</h3>
<p>Responsive Grids work by adding media classes to the Grid cells or containers. When those media values are met, the grids automatically adjust accordingly.</p>
<p>The cells below should be full width by default and scaled to fit above <code>48em</code>. Resize your browser to see them in action.</p>
<div class="Grid Grid--gutters Grid--full large-Grid--fit u-textCenter">
  <div class="Grid-cell">
    <div class="Demo">Full / Halves</div>
  </div>
  <div class="Grid-cell">
    <div class="Demo">Full / Halves</div>
  </div>
</div>

<div class="Grid Grid--gutters Grid--full large-Grid--fit u-textCenter">
  <div class="Grid-cell">
    <div class="Demo">Full / Thirds</div>
  </div>
  <div class="Grid-cell">
    <div class="Demo">Full / Thirds</div>
  </div>
  <div class="Grid-cell">
    <div class="Demo">Full / Thirds</div>
  </div>
</div>



<h3>Grid-ception</h3>
<p>Grid components are infinitely nestable inside of other grid components.</p>
<div class="Grid Grid--gutters Grid--flexCells u-textCenter">
  <div class="Grid-cell">
    <div class="Demo">
      <div class="Grid Grid--gutters u-textCenter">
        <div class="Grid-cell u-1of3">
          <div class="Demo">1/3</div>
        </div>
        <div class="Grid-cell">
          <div class="Demo">
            <div class="Grid Grid--gutters u-textCenter">
              <div class="Grid-cell">
                <div class="Demo">1/2</div>
              </div>
              <div class="Grid-cell">
                <div class="Demo">1/2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="Grid-cell u-1of3">
    <div class="Demo">1/3</div>
  </div>
</div>
<h2>Alignment Features</h2>
<h3>Top-aligned Grid Cells</h3>
<div class="Grid Grid--gutters Grid--top">
  <div class="Grid-cell">
    <div class="Demo">
      This cell should be top-aligned.
    </div>
  </div>
  <div class="Grid-cell u-1of2">
    <div class="Demo">
      Pellentesque sagittis vel erat ac laoreet. Phasellus ac aliquet enim, eu aliquet sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pulvinar porta leo, eu ultricies nunc sollicitudin vitae. Curabitur pulvinar dolor lectus, quis porta turpis ullamcorper nec. Quisque eget varius turpis, quis iaculis nibh.
    </div>
  </div>
  <div class="Grid-cell">
    <div class="Demo">
      This cell should be top-aligned.
    </div>
  </div>
</div>
<h3>Bottom-aligned Grid Cells</h3>
<div class="Grid Grid--gutters Grid--bottom">
  <div class="Grid-cell">
    <div class="Demo">
      This cell should be bottom-aligned.
    </div>
  </div>
  <div class="Grid-cell">
    <div class="Demo">
      Curabitur pulvinar dolor lectus, quis porta turpis ullamcorper nec. Quisque eget varius turpis, quis iaculis nibh. Ut interdum ligula id metus hendrerit cursus. Integer eu leo felis. Aenean commodo ultrices nunc, sit amet blandit elit gravida in.
    </div>
  </div>
  <div class="Grid-cell">
    <div class="Demo">
      This cell should be bottom-aligned.
    </div>
  </div>
</div>
<h3>Vertically Centered Grid Cells</h3>
<div class="Grid Grid--gutters Grid--center">
  <div class="Grid-cell">
    <div class="Demo">
      This cell should be vertically-centered with the cell to its right.
    </div>
  </div>
  <div class="Grid-cell">
    <div class="Demo">
      Curabitur pulvinar dolor lectus, quis porta turpis ullamcorper nec. Quisque eget varius turpis, quis iaculis nibh. Ut interdum ligula id metus hendrerit cursus. Integer eu leo felis. Aenean commodo ultrices nunc, sit amet blandit elit gravida in. Sed est ligula, ornare ac nisi adipiscing, iaculis facilisis tellus. Nullam vel facilisis libero. Duis semper lobortis elit, vitae dictum erat.</div>
  </div>
</div>
<h3>Mixed Vertical Alignment</h3>
<div class="Grid Grid--gutters">
  <div class="Grid-cell Grid-cell--top">
    <div class="Demo">
      This cell should be top aligned.
    </div>
  </div>
  <div class="Grid-cell">
    <div class="Demo">
      Curabitur pulvinar dolor lectus, quis porta turpis ullamcorper nec. Quisque eget varius turpis, quis iaculis nibh. Ut interdum ligula id metus hendrerit cursus. Integer eu leo felis. Aenean commodo ultrices nunc, sit amet blandit elit gravida in. Sed est ligula, ornare ac nisi adipiscing, iaculis facilisis tellus.</div>
  </div>
  <div class="Grid-cell Grid-cell--center">
    <div class="Demo">
      This cell should be center-aligned.
    </div>
  </div>
  <div class="Grid-cell Grid-cell--bottom">
    <div class="Demo">
      This cell should be bottom-aligned.
    </div>
  </div>
</div>
  </div>
</template>
 
<script type="text/babel">
  export default {
    data() {
      return {
        msg:'侧边栏'
      }
    },
    methods: {
     
    }
  }
</script>
 
<style scoped>
  .contain{
      /* display: flex;
      justify-content: center;
      align-items: center */
      padding: 50px
  }
  .Grid{
    display: flex;
    flex-wrap: wrap;
  }
  .Grid--gutters {
    /* margin: -16px 0 16px -16px; */
  }
  .u-textCenter {
    text-align: center!important;
  }
  .Grid--gutters > .Grid-cell{
    padding: 16px 0 0 12px;
   
  }
  .Grid-cell{
     flex: 1
  }
  .Demo{
    width: 100%;
    padding:12px;
    background: hsla(31,15%,50%,.1);
    border-radius: 3px;
    box-sizing: border-box;   
  }

  .u-1of2{
    flex: 2
    /* width: 50%;
    flex: none !important; */
  }
  .u-1of3{
    width: 33.33%;
    flex: none !important;
  }
  .u-1of4{
    width: 25%;
    flex: none !important;
  }

  .Grid--full > .Grid-cell {
  flex: 0 0 100%;
  }

  /* @custom-media --break-lg (min-width: 768px); */
  @media (min-width: 768px) {
  .large-Grid--fit > .Grid-cell {
    flex: 1;
  }
  }

  .Grid--flexCells > .Grid-cell {
    display: flex;
  }
 
</style>