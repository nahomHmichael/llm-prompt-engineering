# llm-prompt-engineering

**Table of Contents**

- [LLM-Prompt-Engineering](#llm-prompt-engineering)
  - [Overview](#overview)
  - [Scenario](#scenario)
  - [Approach](#approach)
  - [Project Structure](#project-structure)
    - [data:](#data)
    - [models:](#models)
    - [notebooks:](#notebooks)
    - [tests:](#tests)
    - [logs:](#logs)
    - [root folder](#root-folder)
  - [Installation guide](#installation-guide)

## Overview
This project tries to systematically explore strategies that help generate prompts for LLMs to extract relevant entities from job descriptions and also to classify web pages given only a few examples of human scores. 
  
## Scenario

A client has a system that collects news artifacts from web pages, tweets, facebook posts, etc. The client is interested in scoring a given new artifact against a topic. The client has hired experts to score a few of these news items in the range from 0 to 10; a score of 0 means the news item is totally NOT relevant while a score of 10 means the news item is very relevant. The range of results between 0 and 10 signifies the  degree of relevance of the news item to the topic. 
The client wants to explore how useful existing LLMs such as GPT-3 are for this task. You are hired as a consultant to explore the efficiency of GPT3-like LLMs to this task. If your recommendation is positive, you must demonstrate that your strategies to design prompts are reproducible and produce a consistent result. 

## Approach

The project is divided and implemented by the following phases:
- Design optimal prompts
- Setup MLOps pipeline that helps automate the task of using different LLMs and different topics.
- Apply the optimal desing strategy 
- Entity extraction and Relationship extraction
- Score news titles based on relevance.
- API end-point creation.  
