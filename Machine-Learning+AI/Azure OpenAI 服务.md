[Azure OpenAI 服务](#top)

- [OpenAI 的自然语言功能](#openai-的自然语言功能)
- [OpenAI 代码生成功能- code generation](#openai-代码生成功能--code-generation)
- [OpenAI 图像生成功能- image generation](#openai-图像生成功能--image-generation)
- [OpenAI原则](#openai原则)

## OpenAI 的自然语言功能

- 根据单词或字符块（称为标记）对自然语言学习模型进行训练
- 生成式预训练转换器 (GPT) 模型: 接受输入或提示以返回自然语言、视觉对象或代码响应

|任务 |提示 |
|---|---|
|汇总文本Summarizing text|	“将此文本汇总为简短的介绍”|
|对文本进行分类Classifying text	|“这本书属于哪个流派？”|
|生成名称或短语Generating names or phrases	|“为我的花卉公司写一个宣传语”|
|翻译Translation|	“将‘How are you’翻译为法语”|
|回答问题Answering questions|	“Azure OpenAI 提供哪些功能？”|
|建议内容Suggesting content|	“推荐五首最佳婚礼歌曲”|

## OpenAI 代码生成功能- code generation

GitHub Copilot: OpenAI 与 GitHub 合作创建了 GitHub Copilot，他们称之为 AI 对程序员。 GitHub Copilot 将 OpenAI Codex 的强大功能集成到 Visual Studio Code 等开发人员环境的插件中

## OpenAI 图像生成功能- image generation

- **DALL-E**: 处理图像的模型称为 DALL-E。 与 GPT 模型非常相似，DALL-E 的后续版本也会附加在名称上，例如 DALL-E 2。 图像功能通常分为图像创建、编辑图像和创建图像变体这三类
  - 图像生成: 通过提供想要的图像特征的文本提示来生成原始图像
  - 编辑图像: 如果向 DALL-E 提供了图像，DALL-E 可以根据要求通过更改图像样式、添加或删除项，或生成要添加的新内容来编辑图像。 通过上传原始图像并指定一个透明掩模来进行编辑，该透明掩模指示要编辑的图像区域。 指示要编辑内容的提示以及图像和透明掩模指示模型，生成适当的内容来填充该区域
  - 图像变体: 通过提供图像并指定想要的图像变体数量来创建图像变体。 图像的一般内容将保持不变，但对象所在位置或视线、背景场景和颜色等方面可能会发生更改

## OpenAI原则

six Microsoft [AI principles](https://learn.microsoft.com/zh-cn/azure/machine-learning/concept-responsible-ai)

- **Fairness**: AI systems shouldn't make decisions that discriminate against or support bias of a group or individual
- **Reliability** and **Safety**: AI systems should respond safely to new situations and potential manipulation
- **Privacy** and **Security**: AI systems should be secure and respect data privacy
- **Inclusiveness**: AI systems should empower everyone and engage people
- **Accountability**: People must be accountable for how AI systems operate
- **Transparency**: AI systems should have explanations so users can understand how they're built and used
- 公平性：AI 系统不应做出歧视群体或个人或者支持群体或个人偏见的决策
- 可靠性和安全性：AI 系统应对新情况和潜在操作安全地作出响应
- 隐私与安全：AI 系统应保证安全并尊重数据隐私
- 包容：AI 系统应该支持每个人并吸引人们参与
- 问责：人们必须对 AI 系统的运营情况负责
- 透明度：AI 系统应具有说明，以便用户能够了解其构建和使用方式
