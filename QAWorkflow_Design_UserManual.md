END-TO-END AGENTIC AI

QA WORKFLOW

Design Document & User Manual

Table of Contents

1. System Overview

1.1 Purpose

The End-to-End Agentic AI QA Workflow is an autonomous quality assurance system that orchestrates multiple AI agents and browser automation tools to deliver a complete testing lifecycle. Starting from a plain-language user story (e.g., SCRUM-101), the system autonomously generates test plans, performs exploratory testing, writes Playwright automation scripts, heals failing tests, produces comprehensive reports, and commits all artifacts to version control.

1.2 Goals & Objectives

Eliminate manual test writing by generating Playwright scripts from natural language user stories

Reduce regression cycle time from days to hours through AI-driven automation

Self-heal failing tests automatically without human intervention

Provide complete audit trails via structured reports and Git history

Enable non-technical stakeholders to initiate full QA cycles using plain English prompts

1.3 Scope

This system covers the following QA activities:

Requirement ingestion from Markdown-format user stories

AI-powered test plan generation with scenario classification

Exploratory browser testing via Playwright MCP server

Automated Playwright JavaScript test script generation

Test execution with automatic failure healing

Comprehensive test report compilation

Git commit and push via GitHub MCP agent

1.4 System Architecture Summary

The system is composed of three layers:

Input Layer: User story Markdown files stored in user-stories/ directory

Agent Layer: Specialized AI agents for planning, generation, healing, and reporting

Output Layer: Generated artifacts stored in specs/, tests/, and test-results/ directories

2. System Architecture & Design

2.1 High-Level Workflow

The workflow follows a strict sequential execution model with data passing between steps. Each step produces artifacts consumed by subsequent steps:

2.2 Agent Definitions

playwright-test-planner

playwright-test-generator

playwright-test-healer

GitHub MCP Agent

2.3 Data Flow

The following shows how data moves between steps:

2.4 Directory Structure

2.5 Technology Stack

3. Detailed Step Design

3.1 Objective

Extract all testable requirements, acceptance criteria, application URL, and test credentials from the input Markdown user story file.

3.2 Inputs

File: user-stories/SCRUM-101-ecommerce-checkout.md

Natural language prompt instructing the system to read and summarize

3.3 Processing

Read and parse the Markdown file using the file system tool

Identify sections: Description, Acceptance Criteria, Technical Notes

Extract application URL and test credentials

Identify key features and workflows to be tested

Summarize findings in structured format

3.4 Expected Outputs

Summary of the user story in plain language

Numbered list of acceptance criteria

Application base URL (e.g., https://saucedemo.com)

Test credentials (username/password pairs)

Key features to test (checkout, login, cart, etc.)

3.5 Objective

Autonomously explore the application and generate a comprehensive test plan covering all acceptance criteria, organized by scenario type.

3.6 Agent

Agent: playwright-test-planner

Tool: Playwright Browser MCP (for autonomous navigation)

3.7 Processing

Read application URL and credentials from Step 1 output

Launch browser and navigate to application

Explore all UI workflows referenced in acceptance criteria

Map UI elements, form fields, validation messages, and navigation paths

Generate test scenarios grouped by category

Save test plan as structured Markdown to specs/ directory

3.8 Test Scenario Categories

Happy Path Scenarios: Successful end-to-end user journeys

Negative Scenarios: Validation errors, empty fields, invalid data

Edge Cases: Boundary conditions, max/min values, special characters

Navigation Flow Tests: Page transitions, back button, breadcrumbs

UI Element Validation: Labels, placeholders, buttons, error messages

3.9 Expected Outputs

File: specs/saucedemo-checkout-test-plan.md

Each scenario with: title, preconditions, step-by-step instructions, expected results, test data

3.10 Objective

Manually execute all test scenarios from the test plan using Playwright browser tools, document actual vs expected behavior, and gather real element selectors for automation.

3.11 Tool

Tool: Playwright Browser MCP

Mode: Manual (step-by-step execution following test plan)

3.12 Processing

Read test plan from specs/saucedemo-checkout-test-plan.md

Execute each test scenario step-by-step using browser tools

Verify expected results against actual application behavior

Take screenshots at key steps and error states

Record element selectors (IDs, data attributes, ARIA roles) used

Document any UI inconsistencies, bugs, or unexpected behaviors

3.13 Expected Outputs

Pass/Fail result for each test scenario

Screenshots at key interaction points and error states

Catalog of reliable element selectors per scenario

List of observed bugs and UI inconsistencies

Timing behaviors and wait requirement notes

3.14 Objective

Generate production-quality Playwright JavaScript test scripts using insights from both the test plan and exploratory testing findings.

3.15 Agent

Agent: playwright-test-generator

Inputs: Test plan + Manual test findings (selectors, timing, workarounds)

3.16 Script Requirements

3.17 Expected Outputs

tests/saucedemo-checkout/happy-path.spec.js

tests/saucedemo-checkout/negative-scenarios.spec.js

tests/saucedemo-checkout/edge-cases.spec.js

tests/saucedemo-checkout/navigation.spec.js

3.18 Objective

Execute all generated test scripts, identify failures, autonomously apply fixes, and iterate until all tests pass consistently.

3.19 Agent

Agent: playwright-test-healer

3.20 Healing Logic

3.21 Execution Flow

Run all .spec.js files via Playwright test runner

Parse test results for failures

For each failed test: analyze failure type, apply fix, update file

Re-run healed tests to confirm fix

Repeat until zero failures (or document non-healable tests)

3.22 Expected Outputs

Updated (healed) .spec.js files in tests/saucedemo-checkout/

Final test run: all passing

Healing log: what was fixed, how, in which file/test

3.23 Objective

Compile all results from Steps 3–5 into a single, comprehensive Markdown test execution report.

3.24 Report Structure

Executive Summary: Total planned, executed, pass/fail/blocked counts

Manual Test Results (Step 3): Scenario-by-scenario results with screenshots

Automated Test Results (Step 5): Suite-level pass/fail, initial vs final after healing

Bug/Defect Log: Expected vs actual, severity, evidence screenshots, environment

Test Coverage Analysis: Acceptance criteria coverage map, gaps identified

Summary & Recommendations: Overall quality assessment, risk areas, next steps

3.25 Expected Outputs

File: test-results/SCRUM-101-checkout-test-report.md

3.26 Objective

Stage all workspace artifacts, create a conventionally-formatted commit, and push to the remote Git repository.

3.27 Agent

Agent: GitHub MCP Agent

Repository: https://github.com/mangeshganeshjoshi/AgentE2EQAWorkflow-Playwright.git

3.28 Git Operations

git init (if not already initialized)

git add . (stage all files including user-stories/, specs/, tests/, test-results/)

git commit -m "feat(tests): Add complete test suite for SCRUM-101 checkout workflow"

git push origin main

3.29 Commit Message Format

3.30 Expected Outputs

All workspace files committed and pushed to remote repository

Commit SHA and push confirmation logged

Summary of files committed provided to user

4. User Manual

4.1 Prerequisites

4.1.1 Software Requirements

4.1.2 Access Requirements

OpenAI or Anthropic API key (for AI agent LLM backend)

GitHub Personal Access Token (PAT) with repo write permission

Network access to target application URL

Test credentials for the application under test

4.2 Setup Guide

Step 1: Install Playwright

Step 2: Configure MCP Servers

Add the following to your MCP configuration file (.mcp.json or equivalent in your agent host):

Step 3: Prepare User Story File

Create the user story in Markdown format at: user-stories/SCRUM-101-ecommerce-checkout.md

The file must include:

Feature description and user story statement

Acceptance criteria (numbered list)

Application URL

Test credentials (username / password)

4.3 Running the Workflow

4.3.1 Option A — Run Each Step Individually

Use the individual step prompts (see Section 3) for full control. Copy each prompt into your AI agent host in order, waiting for each step to complete before proceeding.

4.3.2 Option B — Single End-to-End Prompt

For a fully automated run, use the consolidated prompt below in your AI agent host:

4.4 Interpreting Outputs

4.4.1 Test Plan (specs/...test-plan.md)

Review for coverage completeness against acceptance criteria

Verify scenario categories include happy path, negative, and edge cases

Confirm test data requirements are captured

4.4.2 Automation Scripts (tests/.../*.spec.js)

Each .spec.js maps to a test suite category

Check beforeEach/afterEach hooks are present

Verify browser configuration in playwright.config.js

4.4.3 Test Report (test-results/...report.md)

Executive summary shows overall pass rate

Defect log entries indicate bugs requiring developer action

Coverage analysis highlights gaps needing additional test scenarios

4.4.4 Git Repository

All artifacts committed under a single feat(tests): commit

Commit resolves the original SCRUM ticket (e.g., SCRUM-101)

Full test history available for future sprints

5. Troubleshooting Guide

6. Best Practices & Recommendations

6.1 User Story Quality

Write acceptance criteria in Given/When/Then format for better AI parsing

Include explicit application URL and test credentials in the user story file

Number each acceptance criterion for traceability in the test plan

Specify any known test data (product names, quantities, coupon codes)

6.2 Test Plan Quality

Review the generated test plan before proceeding to Step 3

Add any missing edge cases that the AI may have overlooked

Ensure negative scenarios cover all form validation rules

6.3 Automation Script Quality

Prefer data-testid attributes over CSS classes for selector stability

Use Playwright's built-in network idle waiting for SPA applications

Parameterize test data using fixtures or test.each() for data-driven tests

Run scripts locally before committing to catch environment-specific issues

6.4 Healing Boundaries

Set a maximum healing iteration limit (recommended: 3 rounds)

If a test cannot be healed after 3 attempts, mark it as blocked and file a bug

Review healed tests manually to ensure fixes are semantically correct

6.5 Reporting

Share test reports with developers before closing the sprint

Link defect log entries to Jira/GitHub issues for traceability

Archive test reports per sprint for trend analysis

7. Glossary

8. Document Revision History