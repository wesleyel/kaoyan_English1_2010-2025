#!/usr/bin/env bash
set -euo pipefail

rm -rf book/src
mkdir -p book/src

# Ensure landing page exists
if [[ ! -f book/src/README.md ]]; then
  cat > book/src/README.md << 'EOF'
# 考研英语一真题（2010–2025）

本项目使用 mdBook 将仓库中的 Markdown 试题文件（2010–2025）转换为静态网站，方便在线阅读与检索。

- 左侧目录按年份自动生成
- 文件内容来源于仓库根目录的 `.md` 文件
- 如需新增年份，只需在仓库根目录添加相应的 Markdown 文件并推送到 master 分支，CI 会自动更新网站
EOF
fi

# Copy top-level Markdown files from repo root (exclude README.md and book/)
find . -maxdepth 1 -type f -name "*.md" ! -path "./book/*" ! -name "README.md" -print0 | while IFS= read -r -d '' f; do
  cp -f -- "$f" "book/src/$(basename "$f")"
done

# Generate SUMMARY.md dynamically
{
  echo "# Summary"
  echo
  echo "- [首页](README.md)"
  echo
  find book/src -maxdepth 1 -type f -name "*.md" ! -name "README.md" ! -name "SUMMARY.md" -exec basename {} \; \
    | LC_ALL=C sort -V \
    | while IFS= read -r base; do
        title="${base%.md}"
        printf -- "- [%s](<%s>)\n" "$title" "$base"
      done
} > book/src/SUMMARY.md
