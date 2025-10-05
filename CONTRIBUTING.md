# Contributing to NFT Designer Plugin

Thank you for your interest in contributing to the NFT Designer Plugin! This guide will help you get started with contributing to our project.

## 🤝 How to Contribute

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/your-username/figma-plugin.git
cd figma-plugin
```

### 2. Set Up Development Environment

```bash
# Install dependencies
npm run install:all

# Copy environment file
cp env.example .env

# Set up your development environment
npm run dev:backend
npm run dev:web-signer
npm run dev:figma
```

### 3. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 4. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Add tests for new functionality
- Update documentation as needed

### 5. Test Your Changes

```bash
# Run all tests
npm run test:contracts
npm run type-check

# Test the complete flow
# 1. Start backend and web signer
# 2. Load plugin in Figma
# 3. Test your changes
```

### 6. Commit Your Changes

```bash
git add .
git commit -m "feat: add new feature description"
# or
git commit -m "fix: resolve issue description"
```

### 7. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 📝 Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```
feat(plugin): add batch minting support
fix(backend): resolve IPFS upload timeout
docs(readme): update installation instructions
test(contracts): add minting test cases
```

## 🏗️ Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused

### File Organization

```
src/
├── components/     # React components
├── services/       # Business logic
├── utils/          # Utility functions
├── types/          # TypeScript types
└── constants/      # Application constants
```

### Testing Requirements

- Unit tests for utility functions
- Integration tests for API endpoints
- Contract tests for smart contracts
- End-to-end tests for complete workflows

### Documentation

- Update README.md for user-facing changes
- Update ARCHITECTURE.md for structural changes
- Add inline comments for complex logic
- Update API documentation for new endpoints

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to reproduce the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: OS, Node.js version, browser, etc.
6. **Screenshots**: If applicable
7. **Logs**: Any relevant error messages

### Bug Report Template

```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- OS: [e.g. macOS 12.0]
- Node.js: [e.g. 16.14.0]
- Browser: [e.g. Chrome 91.0]
- Figma Version: [e.g. 116.0.0]

## Screenshots
If applicable, add screenshots

## Additional Context
Any other context about the problem
```

## ✨ Feature Requests

When requesting features, please include:

1. **Use Case**: Why is this feature needed?
2. **Proposed Solution**: How should it work?
3. **Alternatives**: Other solutions considered
4. **Additional Context**: Any other relevant information

### Feature Request Template

```markdown
## Feature Description
Brief description of the feature

## Use Case
Why is this feature needed? What problem does it solve?

## Proposed Solution
How should this feature work? Describe the implementation.

## Alternatives
What other solutions have you considered?

## Additional Context
Any other context, mockups, or examples
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:contracts
npm run test:backend
npm run test:plugin

# Run tests in watch mode
npm run test:watch
```

### Writing Tests

- Write tests before implementing features (TDD)
- Test both success and failure cases
- Mock external dependencies
- Use descriptive test names
- Keep tests independent and isolated

### Test Coverage

- Aim for >80% code coverage
- Focus on critical business logic
- Test edge cases and error conditions
- Include integration tests

## 📚 Documentation

### Code Documentation

```typescript
/**
 * Generates AI-enhanced metadata for an NFT
 * @param originalMetadata - The original metadata object
 * @param artName - Name of the artwork
 * @param dimensions - Width and height of the image
 * @returns Promise resolving to enhanced metadata
 */
export async function generateEnhancedMetadata(
  originalMetadata: NFTMetadata,
  artName: string,
  dimensions: { width: number; height: number }
): Promise<EnhancedMetadata> {
  // Implementation
}
```

### API Documentation

```typescript
/**
 * @api {post} /api/mint-nft Mint NFT
 * @apiName MintNFT
 * @apiGroup NFT
 * 
 * @apiParam {Object} exportedData Array of exported art objects
 * @apiParam {Object} metadata NFT metadata object
 * 
 * @apiSuccess {String} tokenId The minted token ID
 * @apiSuccess {String} transactionHash The transaction hash
 * @apiSuccess {String} ipfsHash The IPFS hash
 * 
 * @apiError {String} error Error message
 */
```

## 🔍 Code Review Process

### Review Checklist

- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No breaking changes (or properly documented)
- [ ] Performance considerations addressed
- [ ] Security implications considered

### Review Guidelines

- Be constructive and helpful
- Focus on the code, not the person
- Suggest improvements, don't just point out problems
- Ask questions if something is unclear
- Approve when ready, don't rush

## 🚀 Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Steps

1. Update version numbers in package.json files
2. Update CHANGELOG.md
3. Create release notes
4. Tag the release
5. Deploy to production

## 🏷️ Labels and Milestones

### Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements to documentation
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `priority: high`: High priority
- `priority: medium`: Medium priority
- `priority: low`: Low priority

### Pull Request Labels

- `ready for review`: Ready for code review
- `needs testing`: Requires additional testing
- `breaking change`: Contains breaking changes
- `documentation`: Documentation changes only

## 💬 Communication

### Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and discussions
- **Discord**: For real-time chat (if available)
- **Email**: For security issues

### Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Respect different opinions and approaches

## 🎯 Contribution Areas

### High Priority

- Bug fixes and stability improvements
- Performance optimizations
- Security enhancements
- Documentation improvements

### Medium Priority

- New features and enhancements
- UI/UX improvements
- Testing improvements
- Developer experience

### Low Priority

- Nice-to-have features
- Cosmetic improvements
- Experimental features
- Future considerations

## 📋 Contributor Checklist

Before submitting your contribution:

- [ ] Code follows the style guidelines
- [ ] Self-review of your code
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] Commit messages follow the convention
- [ ] No merge conflicts
- [ ] All CI checks are passing

## 🙏 Recognition

Contributors will be recognized in:

- CONTRIBUTORS.md file
- Release notes
- Project documentation
- GitHub contributor graph

Thank you for contributing to the NFT Designer Plugin! Your contributions help make this project better for everyone.
