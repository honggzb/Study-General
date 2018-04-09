- [Bootstrap盒子模型的注意事项](#Bootstrap盒子模型的注意事项)

----------------------------

### Bootstrap盒子模型的注意事项

Bootstrap给所有的盒子都加了box-sizing:border-box这个样式，所以实际宽度是减去border和padding之后所剩下的宽度。box-sizing这个是css3样式，在can I use 上显示IE8以下不支持这个属性的。所以Bootstrap3在IE7和IE6是惨不忍睹的。你也可以加这个IE的降级标签：

`<meta http-equiv="X-UA-Compatible" content="IE=edge">`

-------------------------------------------
