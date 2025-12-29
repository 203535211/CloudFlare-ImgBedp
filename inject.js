
(function() {
    const style = document.createElement('style');
    style.textContent = `
        /* 强制网格背景 */
        html, body {
            background-color: #f8f9fa !important;
            background-image: 
                linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px) !important;
            background-size: 20px 20px !important;
            background-attachment: fixed !important;
        }

        /* 强制隐藏原有的背景容器 */
        #app > div, .bg-container, [class*="background"] {
            background-image: none !important;
            background-color: transparent !important;
        }

        /* 自定义 Header 样式 */
        .custom-header-injected {
            display: flex;
            align-items: center;
            padding: 12px 24px;
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(0,0,0,0.05);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 9999;
            box-shadow: 0 2px 10px rgba(0,0,0,0.02);
        }

        .brand-title-injected {
            font-size: 18px;
            font-weight: 700;
            color: #1a1a1a;
            margin-right: 12px;
            letter-spacing: -0.5px;
        }

        .brand-subtitle-injected {
            font-size: 13px;
            color: #666;
            border-left: 1.5px solid #ddd;
            padding-left: 12px;
            font-weight: 400;
        }

        /* 修正页面主体位置，防止被 Header 遮挡 */
        #app {
            margin-top: 60px !important;
        }

        /* 强力美化上传框 */
        .el-upload-dragger {
            border: 2px dashed #e0e0e0 !important;
            background: rgba(255,255,255,0.8) !important;
            border-radius: 16px !important;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .el-upload-dragger:hover {
            border-color: #409eff !important;
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.05);
        }
    `;
    /* 后台管理界面强力优化样式 */
    style.textContent += `
        /* 后台通用容器优化 */
        .admin-container, .dashboard-main, .el-main {
            background: #f0f2f5 !important;
            padding: 15px !important;
        }

        /* 移动端表格适配：强制转换为卡片感 */
        @media screen and (max-width: 768px) {
            .el-table__header-wrapper {
                display: none !important;
            }
            .el-table__row {
                display: block !important;
                margin-bottom: 15px !important;
                border: 1px solid #ebeef5 !important;
                border-radius: 8px !important;
                background: #fff !important;
                box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05) !important;
                overflow: hidden !important;
            }
            .el-table__row td {
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                border: none !important;
                padding: 10px 15px !important;
                text-align: right !important;
            }
            .el-table__row td::before {
                content: attr(data-label);
                font-weight: bold;
                color: #909399;
                text-align: left;
                flex: 1;
            }
            .el-table__cell {
                width: 100% !important;
            }
            
            /* 侧边栏在移动端隐藏或优化 */
            .el-aside {
                position: fixed !important;
                left: -100% !important;
                transition: all 0.3s !important;
                z-index: 10000 !important;
            }
            .el-aside.show-mobile {
                left: 0 !important;
            }
        }

        /* 按钮美化 */
        .el-button--primary {
            border-radius: 8px !important;
            box-shadow: 0 4px 10px rgba(64, 158, 255, 0.2) !important;
        }

        /* 图片预览区域美化 */
        .image-item {
            border-radius: 12px !important;
            overflow: hidden !important;
            transition: transform 0.2s !important;
        }
        .image-item:hover {
            transform: scale(1.02) !important;
        }
    `;
    document.head.appendChild(style);

    function injectHeader() {
        if (document.querySelector('.custom-header-injected')) return;
        
        const header = document.createElement('div');
        header.className = 'custom-header-injected';
        header.innerHTML = `
            <div class="brand-title-injected">爱云图床</div>
            <div class="brand-subtitle-injected">TG无限量图床</div>
        `;
        document.body.insertBefore(header, document.body.firstChild);
    }

    // 初始注入
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectHeader);
    } else {
        injectHeader();
    }

    // 针对 Vue 动态渲染的防御性注入
    const observer = new MutationObserver(() => {
        injectHeader();
        
        // 自动为 Element Plus 表格添加 data-label 以支持移动端卡片布局
        document.querySelectorAll('.el-table__row').forEach(row => {
            const headers = Array.from(document.querySelectorAll('.el-table__header th .cell')).map(th => th.innerText);
            row.querySelectorAll('td').forEach((td, index) => {
                if (headers[index] && !td.getAttribute('data-label')) {
                    td.setAttribute('data-label', headers[index]);
                }
            });
        });
    });
    observer.observe(document.body, { childList: true, subtree: false });
})();
