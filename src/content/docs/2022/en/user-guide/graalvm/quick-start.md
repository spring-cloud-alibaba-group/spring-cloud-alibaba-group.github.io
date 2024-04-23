---
title: "Quick Start"
keywords: [Spring Cloud Alibaba]
description: GraalVM.
---

To use GraalVM's static compilation capability, first ensure that your project's Spring Boot version is 3.0.0 or above, and Spring Cloud version is 2022.0.0 or above. Then introduce the required module dependencies of Spring Cloud Alibaba 2022.0.0.0 or above into the project.

## Environment preparation

To build a native image using Native Build Tools, the GraalVM distribution needs to be installed on the machine first. You can download it manually on the Liberica Native Image Kit page, or use a tool like SDKMAN!
Such a download manager. The demonstration environment in this article is macOS, if it is Windows, you can refer to the corresponding documentation for operation. Execute the following command to install the GraalVM environment:

```bash
$ sdk install java 22.3.r17-nik
$ sdk use java 22.3.r17-nik
```

Verify that the correct version is configured by checking the output of java -version:

```bash
$ java-version
openjdk version "17.0.5" 2022-10-18 LTS
OpenJDK Runtime Environment GraalVM 22.3.0 (build 17.0.5+8-LTS)
OpenJDK 64-Bit Server VM GraalVM 22.3.0 (build 17.0.5+8-LTS, mixed mode)
```

## Generate Hints file

Use the following commands to generate the Hints configuration files required for reflection, serialization and dynamic proxies in the application, provided that the `spring-boot-starter-parent` parent module is introduced into the application:

```bash
$ mvn -Pnative spring-boot:run
```

After the application will start, it is necessary to test all the functions of the application as completely as possible to ensure that most of the code of the application is covered by test cases, so as to ensure that all necessary dynamic properties during the running of the application are fully generated. After running all the test cases, we found that the following hints files will be generated in the `resource/META-INF/native-image` directory:

- resource-config.json: resource hint file in the application
- reflect-config.json: reflection definition hint file in the application
- serialization-config.json: the serialization content hint file in the application
- proxy-config.json: a hint file for Java proxy related content in the application
- jni-config.json: Java Native Interface (JNI) content hint file in the application

Note: In the GA version of Spring Cloud Alibaba 2022.0.0.0, all modules except `spring-cloud-circuitbreaker-sentinel` and `spring-cloud-alibaba-sentinel-gateway` have included the configuration content required by the dynamic features of their own components by default. Therefore, the above pre-execution process is mainly to scan the dynamic features in the application's own business code and other third-party packages, so that the subsequent static compilation process can proceed smoothly and the application can start normally.

## Build the native application

After all the above steps are ready, use the following command to build the native image:

```bash
$ mvn -Pnative native:compile
```

After successful execution, we can see the generated executable file in the `/target` directory.

## Start the application

It is no different from ordinary executable files, start the application through `target/xxx`, you can observe the output similar to the following:

```
2022-12-22T16:28:51.006+08:00 INFO 75439 --- [ main] o.s.b.w.embedded.tomcat.TomcatWebServer : Tomcat started on port(s): 8888 (http) with context path ''
2022-12-22T16:28:51.008+08:00 INFO 75439 --- [ main] c.a.cloud.imports.examples.Application : Started Application in 0.653 seconds (process running for 0.662)
```

It can be found that the startup speed of the application is greatly accelerated. Then use the `vmmap pid | grep Physical` command to view the memory usage during the running process. The memory usage of the application started by the native image is as follows:

```
Physical footprint: 59.2M
Physical footprint (peak): 59.2M
```

The community compared the memory usage of the same application starting a Java application in a normal way as follows:

```
Physical footprint: 214.0M
Physical footprint (peak): 256.8M
```

It can be seen that after starting the Java application through the native image, the memory usage is greatly reduced. After the application is started, the functions are the same as those started by JVM.
