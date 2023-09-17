## Contribution Documentation Description

Before contributing to this Spring Cloud Alibaba official website documentation repository. Please read this contribution document first to ensure that the document format is correct, reduce the number of times to modify the document format repeatedly, and reduce the difficulty of document review.

## Docs must be read before writing

Here are a few questions to consider before writing documentation:

- What is the scope of the function, that is, to what extent? \*\*
- **Which steps are easy to make mistakes for the user of the function module during the use process, should the instructions be pointed out in advance? **

1. Do not use us, xxx et al. to refer to in formal written documents:

   ```markdown
   We use the following configuration

   ~~We~~ use the following configuration
   ```

2. Appropriate punctuation marks need to be added after the end of the document (note the difference between Chinese and English symbols **Chinese：，English：**):

   ```markdown
   When using the spring-cloud-starter-nacos-config module function, the following configuration needs to be introduced in the project pom.xml file

   When using the spring-cloud-starter-nacos-config module function, the following configuration needs to be introduced in the project pom.xml file:
   ```

3. Pay attention to the writing format of proper nouns:

   ```markdown
   spring cloud -> Spring Cloud
   feign -> Feign
   nacos -> Nacos
    …

   Some proper nouns need to add spaces:
   DestinationRule -> Destination Rule
   ```

   > 1. Pay attention to the part of speech when writing in English. Titles should not use verbs, generally nouns!
   > 2. When proper nouns are vague, use a search engine to search to ensure correctness!

4. Note that the first letter of the module title is capitalized in English

   ```markdown
   ~~routing example~~

   Routing Example
   ```

5. Different content needs to be given the corresponding code block type:

   ```java
   public static void main(String[] args) {

       System.out.println("test");

   }
   ```

   ```markdown
   public static void main(String[] args) {

       System.out.println("test");

   }
   ```

6. Acronyms need to be declared before they are used (students outside the community may not know the meaning of the abbreviations):

   ```markdown
   It means that the authentication of ~~SCA~~ has been passed.

   The advance statement is: Spring Cloud Alibaba (hereinafter referred to as SCA)
   ```

7. Key content, such as specific configuration files and dependency names, need to be shaded:

   Need to introduce spring-cloud-starter-stream-rocketmq module dependency

   Need to introduce `spring-cloud-starter-stream-rocketmq` module dependency

8. Leave a space between English and Chinese to ensure readability:

   ```markdown
   Environment~~On Nacos, you need to~~add the ~~basic configuration that corresponds to the dataId

   In the environment, Nacos needs to add the basic configuration corresponding to dataId
   ```

9. **After writing the document, read it at least once by yourself, otherwise there is a high probability that there will be problems! Otherwise, there is a high probability that there is a problem! Otherwise, there is a high probability that there is a problem! **

## Project run test

### Run tests locally

- When the Chinese document is written, run the `npm run start` command to view the display effect in the local browser.
- When the English document is written, run the `npm run start-en` command to view the display effect in the local browser.

### Local deployment test

- After writing the document, run `npm run build` to build the project, and then run `npm run server` to deploy the project locally, and check the effect in the local browser to ensure that the project is built and deployed successfully.
