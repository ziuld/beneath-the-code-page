package dev.beneaththecode.tools.domain;

/** Temporary test-only violation for F01-UH02-AC02; remove after the remote failure proof. */
public class CIFrameworkLeak {

	public org.springframework.context.ApplicationContext forbiddenDependency;
}
